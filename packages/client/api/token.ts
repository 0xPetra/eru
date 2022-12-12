import { AssumeRoleCommand, STSClient } from '@aws-sdk/client-sts';
import { ERROR_MESSAGE, EVER_API } from '../constants';

const accessKeyId = process.env.EVER_ACCESS_KEY as string;
const secretAccessKey = process.env.EVER_ACCESS_SECRET as string;
const bucketName = process.env.NEXT_PUBLIC_EVER_BUCKET_NAME as string;

export default function handler(req, res) {
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

    return res.status(200).json({ success: true, body: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: ERROR_MESSAGE });
  }
}