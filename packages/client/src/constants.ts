import getEnvConfig from './lib/getEnvConfig';
import packageJson from '../package.json';

// Environments
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const MAINNET_API_URL = 'https://api.eru.gg';  //TODO: Add the actual url

export enum Direction {
  Top,
  Right,
  Bottom,
  Left,
}

export const Directions = {
  [Direction.Top]: { x: 0, y: -1 },
  [Direction.Right]: { x: 1, y: 0 },
  [Direction.Bottom]: { x: 0, y: 1 },
  [Direction.Left]: { x: -1, y: 0 },
};

// Lens Network
export const LENS_NETWORK = import.meta.env.VITE_NEXT_PUBLIC_LENS_NETWORK ?? 'mainnet';

export const API_URL = getEnvConfig().apiEndpoint;
// export const LENSHUB_PROXY = getEnvConfig().lensHubProxyAddress;
// export const LENS_PERIPHERY = getEnvConfig().lensPeripheryAddress;
// export const FREE_COLLECT_MODULE = getEnvConfig().freeCollectModuleAddress;
// export const DEFAULT_COLLECT_TOKEN = getEnvConfig().defaultCollectToken;

export const IS_MAINNET = API_URL === MAINNET_API_URL;


// Messages
export const ERROR_MESSAGE = 'Something went wrong!';
export const SIGN_WALLET = 'Please sign in your wallet.';
export const SIGN_ERROR = 'Failed to sign data';

export const COVER = 'cover';

// Application
export const APP_NAME = 'Eru';
export const APP_VERSION = packageJson.version;
export const DESCRIPTION =
  'Lenster is a composable, decentralized, and permissionless social media web app built with Lens Protocol 🌿';
// export const DEFAULT_OG = 'https://assets.lenster.xyz/images/og/logo.jpeg';

// Utils
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/wav',
  'audio/mp4',
  'audio/aac',
  'audio/ogg',
  'audio/webm',
  'audio/flac'
];
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/mpeg', 'video/ogg', 'video/webm', 'video/quicktime'];
export const ALLOWED_MEDIA_TYPES = [...ALLOWED_AUDIO_TYPES];

// Leafwatch
export const DATADOG_TOKEN = import.meta.env.NEXT_PUBLIC_DATADOG_API_KEY ?? '';
export const DATADOG_APPLICATION_KEY = import.meta.env.NEXT_PUBLIC_DATADOG_APPLICATION_KEY ?? '';
export const LEAFWATCH_HOST = 'https://logs.browser-intake-datadoghq.eu/api/v2/logs';



// URLs
export const POLYGONSCAN_URL = IS_MAINNET ? 'https://polygonscan.com' : 'https://mumbai.polygonscan.com';
export const RARIBLE_URL = IS_MAINNET ? 'https://rarible.com' : 'https://rinkeby.rarible.com';
export const ARWEAVE_GATEWAY = 'https://arweave.net';
export const IMGPROXY_URL = 'https://media.lenster.xyz';
export const IPFS_GATEWAY = '.ipfs.4everland.io';
export const EVER_API = 'https://endpoint.4everland.co';