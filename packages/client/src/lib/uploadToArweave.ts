import axios from 'axios';
import { ERROR_MESSAGE } from '../constants';

/**
 *
 * @param data - Data to upload to arweave
 * @returns arweave transaction id
 */
const uploadToArweave = async (data: string): Promise<string> => {

  const endpoint = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 'http://localhost:9999/.netlify/functions/upload' : '/.netlify/functions/upload'

  try {
    const upload = await axios(endpoint, {
      method: 'POST',
      data
    });
    console.log("🚀 ~ file: uploadToArweave.ts:18 ~ uploadToArweave ~ upload", upload)

    const { id }: { id: string } = upload?.data;
    return id;
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

export default uploadToArweave;
