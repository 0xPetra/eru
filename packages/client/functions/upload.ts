import { Handler } from '@netlify/functions'
import Bundlr from '@bundlr-network/client';
import { APP_NAME, BUNDLR_CURRENCY, BUNDLR_NODE_URL, ERROR_MESSAGE } from '../constants';

const bundlrpk = process.env.BUNDLR_PRIVATE_KEY as string;

export const handler: Handler = async (event, context) => {
  console.log("🚀 ~ file: upload.ts:6 ~ bundlrpk", bundlrpk)
      // Only allow POST
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: "Method Not Allowed." };
    }
    
    if (!event.body) {
      return { statusCode: 405, body: "Body necessary." };
    }
  
    const payload = typeof event.body == 'string' ? event.body : JSON.stringify(event.body);
  
    try {
      const bundlr = new Bundlr(BUNDLR_NODE_URL, BUNDLR_CURRENCY, bundlrpk);
      const tags = [
        { name: 'Content-Type', value: 'application/json' },
        { name: 'App-Name', value: APP_NAME }
      ];
  
      const uploader = bundlr.uploader.chunkedUploader;
      const { data } = await uploader.uploadData(Buffer.from(payload), { tags });
  
      return { statusCode: 200, body: JSON.stringify({success: true, id: data.id}) };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: ERROR_MESSAGE + " " + error }),
      };
    }
};
