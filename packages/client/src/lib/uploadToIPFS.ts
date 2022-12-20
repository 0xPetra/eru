import { S3 } from '@aws-sdk/client-s3';
import axios from 'axios';
import { EVER_API } from '../constants';
import { v4 as uuid } from 'uuid';

interface AttachmentType {
  item: string;
  type: string;
  altTag: string;
}

const bucketName = import.meta.env?.VITE_PUBLIC_EVER_BUCKET_NAME ?? 'eru-staging' as string;
const params = {
  Bucket: bucketName,
  Key: uuid()
};

const endpoint = 'https://eru-5owjm5mh5-0xpetra.vercel.app/api/token'
// const endpoint = '/api/token'

const getTokens = async () => {
  const response = await axios.get(endpoint);
  if (response) {
    return response;
  } else {
    throw new Error(response?.message ?? "Error uploading file.");
  }
}

const getS3Client = async () => {
  try {
  const tokens = await getTokens();
  const client = new S3({
    endpoint: EVER_API,
    credentials: {
      accessKeyId: tokens.data?.body?.accessKeyId,
      secretAccessKey: tokens.data?.body?.secretAccessKey,
      sessionToken: tokens.data?.body?.sessionToken
    },
    region: 'us-west-2',
    maxAttempts: 3
  });
    // toast
    return client;
  } catch (error) {
    // toast
    console.error("You might need to run serverless functions localy")
    throw new Error(error.message);
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
        await client?.putObject({ ...params, Body: file, ContentType: file.type });
        const result = await client?.headObject(params);
        const metadata = result?.Metadata;
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
    throw new Error(error.message);
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
    await client?.putObject({ ...params, Body: file, ContentType: file.type });
    const result = await client?.headObject(params);
    const metadata = result?.Metadata;

    return {
      item: `ipfs://${metadata?.['ipfs-hash']}`,
      type: file.type || 'image/jpeg',
      altTag: ''
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default uploadToIPFS;
