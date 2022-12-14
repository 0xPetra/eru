import { namespaceWorld } from "@latticexyz/recs";
import { NetworkLayer } from "../network";
import { createUploadSoundSystem } from "./systems";
// import { createPositionSystem, createInputSystem } from "./systems";

/**
 * The React layer is responsible for rendering the UI.
 */
export async function createReactLayer(network: NetworkLayer) {
  // --- WORLD ----------------------------------------------------------------------
  const world = namespaceWorld(network.world, "react");

  // --- COMPONENTS -----------------------------------------------------------------
  const components = {};

  // --- PHASER ENGINE SETUP --------------------------------------------------------
  // world.registerDisposer(disposePhaser);

  // --- LAYER CONTEXT --------------------------------------------------------------
  const context = {
    world,
    components,
    network,
    // game,
    // scenes,
  };

  // --- SYSTEMS --------------------------------------------------------------------
  // createPositionSystem(network, context);
  // createInputSystem(network, context);
  createUploadSoundSystem(network, context)

  return context;
}
