import axios from 'axios';
import { ERROR_MESSAGE } from '../constants';

/**
 *
 * @param data - Data to upload to arweave
 * @returns arweave transaction id
 */
const uploadToArweave = async (values: string): Promise<string> => {

  const endpoint = 'https://eru-5owjm5mh5-0xpetra.vercel.app/api/upload'
  // const endpoint = '/api/upload'

  try {
    const upload = await axios(endpoint, {
      method: 'POST',
      data: values
    });
    console.log("🚀 ~ file: uploadToArweave.ts:18 ~ uploadToArweave ~ upload", upload)

    const { id }: { id: string } = upload?.data;
    return id;
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

export default uploadToArweave;
