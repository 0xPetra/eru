import getEnvConfig from '../../lib/getEnvConfig';
import { chain } from 'wagmi';



// Lens Network
export const LENS_NETWORK = process.env.NEXT_PUBLIC_LENS_NETWORK ?? 'mainnet';
export const MAINNET_API_URL = 'https://api.lens.dev';
export const TESTNET_API_URL = 'https://api-mumbai.lens.dev';
export const STAGING_API_URL = 'https://staging-api-social-mumbai.lens.crtlkey.com';
export const SANDBOX_API_URL = 'https://api-sandbox-mumbai.lens.dev';

export const API_URL = getEnvConfig().apiEndpoint;
export const LENSHUB_PROXY = getEnvConfig().lensHubProxyAddress;
export const LENS_PERIPHERY = getEnvConfig().lensPeripheryAddress;
export const FREE_COLLECT_MODULE = getEnvConfig().freeCollectModuleAddress;
export const DEFAULT_COLLECT_TOKEN = getEnvConfig().defaultCollectToken;

export const IS_MAINNET = API_URL === MAINNET_API_URL;

// XMTP
export const XMTP_ENV = IS_MAINNET ? 'production' : 'dev';
export const XMTP_PREFIX = 'lens.dev/dm';

// Git
export const GIT_COMMIT_SHA = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7);

// Misc
export const CONTACT_EMAIL = 'support@lenster.xyz';
export const RELAY_ON = process.env.NEXT_PUBLIC_RELAY_ON === 'true';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

// Leafwatch
export const DATADOG_TOKEN = process.env.NEXT_PUBLIC_DATADOG_API_KEY ?? '';
export const DATADOG_APPLICATION_KEY = process.env.NEXT_PUBLIC_DATADOG_APPLICATION_KEY ?? '';
export const LEAFWATCH_HOST = 'https://logs.browser-intake-datadoghq.eu/api/v2/logs';


// URLs
export const STATIC_ASSETS_URL = 'https://assets.lenster.xyz';
export const STATIC_IMAGES_URL = `${STATIC_ASSETS_URL}/images`;
export const POLYGONSCAN_URL = IS_MAINNET ? 'https://polygonscan.com' : 'https://mumbai.polygonscan.com';
export const RARIBLE_URL = IS_MAINNET ? 'https://rarible.com' : 'https://rinkeby.rarible.com';
export const ARWEAVE_GATEWAY = 'https://arweave.net';
export const IMGPROXY_URL = 'https://media.lenster.xyz';
export const IPFS_GATEWAY = 'https://lens.infura-ipfs.io/ipfs/';
export const EVER_API = 'https://endpoint.4everland.co';

// Web3
export const RPC_URL = IS_MAINNET ? 'https://rpc.ankr.com/polygon' : 'https://rpc.ankr.com/polygon_mumbai';

export const POLYGON_MAINNET = {
  ...chain.polygon,
  name: 'Polygon Mainnet',
  rpcUrls: { default: 'https://polygon-rpc.com' }
};
export const POLYGON_MUMBAI = {
  ...chain.polygonMumbai,
  name: 'Polygon Mumbai',
  rpcUrls: { default: 'https://rpc-mumbai.maticvigil.com' }
};
export const CHAIN_ID = IS_MAINNET ? POLYGON_MAINNET.id : POLYGON_MUMBAI.id;

// Errors
export const ERRORS = {
  notMined:
    'A previous transaction may not been mined yet or you have passed in a invalid nonce. You must wait for that to be mined before doing another action, please try again in a few moments. Nonce out of sync.'
};

// Regex
export const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[\da-z]+([.\-][\da-z]+)*\.[a-z]{2,63}(:\d{1,5})?(\/.*)?$/;
export const ADDRESS_REGEX = /^(0x)?[\da-f]{40}$/i;
export const HANDLE_REGEX = /^[\da-z]+$/;
export const ALL_HANDLES_REGEX = /([\s+])@(\S+)/g;
export const HANDLE_SANITIZE_REGEX = /[^\d .A-Za-z]/g;

// Bundlr
export const BUNDLR_CURRENCY = 'matic';
export const BUNDLR_NODE_URL = 'https://node2.bundlr.network';

// UI
export const MESSAGE_PAGE_LIMIT = 15;
export const SCROLL_THRESHOLD = 0.5;
export const MIN_WIDTH_DESKTOP = 1024;

// Named transforms
export const AVATAR = 'avatar';
export const COVER = 'cover';
export const ATTACHMENT = 'attachment';

// Localstorage keys
export const LS_KEYS = {
  LENSTER_STORE: 'lenster.store',
  TRANSACTION_STORE: 'transaction.store',
  TIMELINE_STORE: 'timeline.store',
  MESSAGE_STORE: 'message.store'
};
