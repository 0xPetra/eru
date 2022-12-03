import { Handler } from '@netlify/functions'
import { AssumeRoleCommand, STSClient } from '@aws-sdk/client-sts';
import { ERROR_MESSAGE, EVER_API } from './constants';

interface Data {
  accessKeyId?: string;
  secretAccessKey?: string;
  sessionToken?: string;
  bucketName?: string;
  message?: string;
  success: boolean;
}

const accessKeyId = process.env.EVER_ACCESS_KEY as string;
const secretAccessKey = process.env.EVER_ACCESS_SECRET as string;
const bucketName = process.env.NEXT_PUBLIC_EVER_BUCKET_NAME as string;

export const handler: Handler = async (event, context) => {
  try {
    const stsClient = new STSClient({
      endpoint: EVER_API,
      region: 'us-west-2',
      credentials: { accessKeyId, secretAccessKey }
    });
    const params = {
      DurationSeconds: 900,
      Policy: `{
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Action": [
              "s3:PutObject",
              "s3:GetObject"
            ],
            "Resource": [
              "arn:aws:s3:::${bucketName}/*"
            ]
          }
        ]
      }`
    };

    const data = await stsClient.send(
      new AssumeRoleCommand({
        ...params,
        RoleArn: undefined,
        RoleSessionName: undefined
      })
    );

    const response = {
      success: true,
      accessKeyId: data.Credentials?.AccessKeyId,
      secretAccessKey: data.Credentials?.SecretAccessKey,
      sessionToken: data.Credentials?.SessionToken
    }

    return { statusCode: 200, body: JSON.stringify(response) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: ERROR_MESSAGE }),
    };
  }
};
