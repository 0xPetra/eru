import { S3 } from '@aws-sdk/client-s3';
import axios from 'axios';
import { EVER_API } from '../constants';
import { v4 as uuid } from 'uuid';

interface AttachmentType {
  item: string;
  type: string;
  altTag: string;
}

const bucketName = process.env.NEXT_PUBLIC_EVER_BUCKET_NAME as string;
const params = {
  Bucket: bucketName,
  Key: uuid()
};

const getTokens = async () => {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return await axios.get('http://localhost:9999/.netlify/functions/token');
  } else {
    return await axios.get('/.netlify/functions/token');
  }
}

const getS3Client = async () => {
  try {
  const tokens = await getTokens();
  const client = new S3({
    endpoint: EVER_API,
    credentials: {
      accessKeyId: tokens.data?.accessKeyId,
      secretAccessKey: tokens.data?.secretAccessKey,
      sessionToken: tokens.data?.sessionToken
    },
    region: 'us-west-2',
    maxAttempts: 3
  });
    // toast
    return client;
  } catch (error) {
    // toast
    console.error("You might need to run 'yarn netlify functions:serve' to run serverless functions localy")
    console.error(error)
  }
};

/**
 *
 * @param data - Data to upload to IPFS
 * @returns attachment array
 */
const uploadToIPFS = async (data: any): Promise<AttachmentType[]> => {
  try {
    const client = await getS3Client();
    const files = Array.from(data);
    const attachments = await Promise.all(
      files.map(async (file: any) => {
        await client.putObject({ ...params, Body: file, ContentType: file.type });
        const result = await client.headObject(params);
        const metadata = result.Metadata;

        return {
          item: `ipfs://${metadata?.['ipfs-hash']}`,
          type: file.type || 'image/jpeg',
          altTag: ''
        };
      })
    );
    return attachments;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 *
 * @param file - File object
 * @returns attachment or null
 */
export const uploadFileToIPFS = async (file: File): Promise<AttachmentType | null> => {
  try {
    const client = await getS3Client();
    await client.putObject({ ...params, Body: file, ContentType: file.type });
    const result = await client.headObject(params);
    const metadata = result.Metadata;

    return {
      item: `ipfs://${metadata?.['ipfs-hash']}`,
      type: file.type || 'image/jpeg',
      altTag: ''
    };
  } catch {
    return null;
  }
};

export default uploadToIPFS;
