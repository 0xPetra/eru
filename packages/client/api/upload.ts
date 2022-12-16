import Bundlr from '@bundlr-network/client';
import { APP_NAME, BUNDLR_CURRENCY, BUNDLR_NODE_URL, ERROR_MESSAGE } from '../constants';

const bundlrpk = process.env?.VITE_BUNDLR_PRIVATE_KEY as string;

 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
 // @ts-ignore
const handler = async (req, res) => {
    // Only allow POST
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Invalid method!' });
    }
  
    if (!req.body) {
      return res.status(400).json({ success: false, message: 'Bad request!' });
    }
  
    const payload = JSON.stringify(req.body);
  
    try {
      const bundlr = new Bundlr(BUNDLR_NODE_URL, BUNDLR_CURRENCY, bundlrpk);
      const tags = [
        { name: 'Content-Type', value: 'application/json' },
        { name: 'App-Name', value: APP_NAME }
      ];
  
      const uploader = bundlr.uploader.chunkedUploader;
      const { data } = await uploader.uploadData(Buffer.from(payload), { tags });
  
      return res.status(200).json({ success: true, id: data.id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: ERROR_MESSAGE + " " + error });
    }
}

export default handler;