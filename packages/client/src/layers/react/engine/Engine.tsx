import React from "react";
import { LayerContext, EngineContext } from "./context";
import { EngineStore } from "./store";
import { BootScreen, MobileWindow, DesktopWindow, Explorer, ErrorPage } from "./components";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useState } from "react";
import { Layers } from "../../../types";
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { BrowserView, MobileView } from 'react-device-detect';
import theme from './theme'

export const Engine: React.FC<{
  setLayers: { current: (layers: Layers) => void };
  mountReact: { current: (mount: boolean) => void };
  customBootScreen?: React.ReactElement;
}> = observer(({ mountReact, setLayers, customBootScreen }) => {
  const [mounted, setMounted] = useState(true);
  const [layers, _setLayers] = useState<Layers | undefined>();

  useEffect(() => {
    mountReact.current = (mounted: boolean) => setMounted(mounted);
    setLayers.current = (layers: Layers) => _setLayers(layers);
  }, []);

  if (!mounted || !layers) return customBootScreen || <BootScreen />;

  const router = createBrowserRouter([
    {
      path: "/",
      // element: <Explorer layers={layers} />,
      element: <Explorer layers={layers} />,
      // loader: BootScreen,
      errorElement: <ErrorPage />,
      // children: [
        //   {
          //     index: true,
          //     path: "create",
          //     element: <DesktopWindow layers={layers}/>,
          //     // loader: BootScreen,
          //   },
          // ],
    },
    {
      path: "/create",
      element: <DesktopWindow layers={layers}/>,
      errorElement: <ErrorPage />,
      // loader: BootScreen,
    },
  ]);

  return (
            <LayerContext.Provider value={layers}>
              <EngineContext.Provider value={EngineStore}>
              <ChakraProvider theme={theme}>

              {/* <ComponentRenderer /> */}

              <BrowserView>
                <RouterProvider router={router} />
              </BrowserView>
              
              <MobileView>
                  <MobileWindow layers={layers} />
              </MobileView>

              </ChakraProvider>
              </EngineContext.Provider>
            </LayerContext.Provider>
  );
});