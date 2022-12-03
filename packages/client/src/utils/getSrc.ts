import { IPFS_GATEWAY } from "../constants";

export default function getSrc(src: string) {
  return src.replace('ipfs', 'https') + IPFS_GATEWAY;
}
