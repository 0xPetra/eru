/* eslint-disable @typescript-eslint/no-explicit-any */
import { getComponentValue, removeComponent, setComponent } from "@latticexyz/recs";
import React from "react";
import ReactDOM from "react-dom/client";
import { Time } from "./utils/time";
import { createNetworkLayer as createNetworkLayerImport } from "./layers/network";
import { createReactLayer as createReactLayerImport } from "./layers/react";
import { Layers } from "./types";
import { Engine as EngineImport } from "./layers/react/engine/Engine";
import { registerUIComponents as registerUIComponentsImport } from "./layers/react/components";
import { Wallet } from "ethers";

import { GameConfig } from "./layers/network/config";
import { isDev } from './utils/isDev';

// Assign variables that can be overridden by HMR
let createNetworkLayer = createNetworkLayerImport;
let createReactLayer = createReactLayerImport;
let registerUIComponents = registerUIComponentsImport;
let Engine = EngineImport;

/**
 * This function is called once when the game boots up.
 * It creates all the layers and their hierarchy.
 * Add new layers here.
 */
async function bootGame() {
  const layers: Partial<Layers> = {};
  let initialBoot = true;

  async function rebootGame(): Promise<Layers> {
    // Remove react when starting to reboot layers, reboot react once layers are rebooted
    mountReact.current(false);

    // TODO: Set statig config or dropdown (no params)

    let worldAddress, privateKey, chainIdString, jsonRpc, wsRpc, checkpointUrl, devMode, initialBlockNumberString, initialBlockNumber;

    const params = new URLSearchParams(window.location.search);
    if (params.get("worldAddress")) {
      worldAddress = params.get("worldAddress");
      privateKey = params.get("burnerWalletPrivateKey");
      chainIdString = params.get("chainId");
      jsonRpc = params.get("rpc") || undefined;
      wsRpc = params.get("wsRpc") || undefined; // || (jsonRpc && jsonRpc.replace("http", "ws"));
      checkpointUrl = params.get("checkpoint") || undefined;
      devMode = params.get("dev") === "true";
      initialBlockNumberString = params.get("initialBlockNumber");
      initialBlockNumber = initialBlockNumberString ? parseInt(initialBlockNumberString) : 0;
    } else {
      worldAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
      chainIdString = isDev() ? '31337' : '4242';
      // TODO: Switch for Optimism Goerli when deployed
      jsonRpc = isDev() ? 'http://localhost:8545' : 'https://follower.super-degen-chain.lattice.xyz';
      wsRpc = isDev() ? 'ws://localhost:8545' : 'wss://follower.super-degen-chain.lattice.xyz';
      checkpointUrl = params.get("checkpoint") || undefined;
      devMode = isDev();
      initialBlockNumberString = undefined;
      initialBlockNumber = 14752190;
      privateKey = import.meta.env?.PRIVATE_KEY;
    }

    if (!privateKey) {
      privateKey = localStorage.getItem("burnerWallet") || Wallet.createRandom().privateKey;
      localStorage.setItem("burnerWallet", privateKey);
    }

    if (worldAddress && privateKey && chainIdString && jsonRpc) {
      const networkLayerConfig: GameConfig = {
        worldAddress,
        privateKey,
        chainId: parseInt(chainIdString),
        jsonRpc,
        wsRpc,
        checkpointUrl,
        devMode,
        initialBlockNumber,
      };
      if (!layers.network) layers.network = await createNetworkLayer(networkLayerConfig);
      if (!layers.react) layers.react = await createReactLayer(layers.network);
      if (!networkLayerConfig) throw new Error("Invalid config");
    }



    // Sync global time with phaser clock
    // Time.time.setPacemaker((setTimestamp) => {
    //   layers.phaser?.game.events.on("poststep", (time: number) => {
    //     setTimestamp(time);
    //   });
    // });

    // Start syncing once all systems have booted
    if (initialBoot) {
      initialBoot = false;
      layers?.network?.startSync();
    }

    // Reboot react if layers have changed
    mountReact.current(true);

    return layers as Layers;
  }

  function dispose(layer: keyof Layers) {
    layers[layer]?.world.dispose();
    layers[layer] = undefined;
  }

  await rebootGame();

  const ecs = {
    setComponent,
    removeComponent,
    getComponentValue,
  };

  (window as any).layers = layers;
  (window as any).ecs = ecs;
  (window as any).time = Time.time;

  let reloadingNetwork = false;
  let reloadingApp = false;

  if (import.meta.hot) {
    import.meta.hot.accept("./layers/network/index.ts", async (module) => {
      if (reloadingNetwork) return;
      reloadingNetwork = true;
      createNetworkLayer = module?.createNetworkLayer;
      dispose("network");
      dispose("react");
      await rebootGame();
      console.log("HMR Network");
      layers.network?.startSync();
      reloadingNetwork = false;
    });

    import.meta.hot.accept("./layers/react/index.ts", async (module) => {
      if (reloadingApp) return;
      reloadingApp = true;
      createReactLayer = module?.createReactLayer;
      dispose("react");
      await rebootGame();
      console.log("HMR Phaser");
      reloadingApp = false;
    });
  }
  console.log("booted");

  return { layers, ecs };
}

const mountReact: { current: (mount: boolean) => void } = { current: () => void 0 };
const setLayers: { current: (layers: Layers) => void } = { current: () => void 0 };

function bootReact() {
  const rootElement = document.getElementById("react-root");
  if (!rootElement) return console.warn("React root not found");

  const root = ReactDOM.createRoot(rootElement);

  function renderEngine() {
    root.render(<Engine setLayers={setLayers} mountReact={mountReact} />);
  }

  renderEngine();
  registerUIComponents();

  if (import.meta.hot) {
    // HMR React engine
    import.meta.hot.accept("./layers/Renderer/React/engine/Engine.tsx", async (module) => {
      Engine = module?.Engine;
      renderEngine();
    });
  }

  if (import.meta.hot) {
    // HMR React components
    import.meta.hot.accept("./layers/Renderer/React/components/index.ts", async (module) => {
      registerUIComponents = module?.registerUIComponents;
      registerUIComponents();
    });
  }
}

export async function boot() {
  bootReact();
  const game = await bootGame();
  setLayers.current(game.layers as Layers);
}
