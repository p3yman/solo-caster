import { createContext, useContext, useState } from "react";
import OBSWebSocket from "obs-websocket-js";

interface OBSContextType {
  isConnected: boolean;
  isRecording: boolean;
  micVolume: number;
  connect: (url: string, password: string) => Promise<void>;
  disconnect: () => void;
}

const OBSContext = createContext<OBSContextType | undefined>(undefined);

export function OBSProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const obs = new OBSWebSocket();

  const getWebSocketURL = (url: string) => {
    if (url.startsWith("ws://") || url.startsWith("wss://")) return url;
    return process.env.NODE_ENV === "production"
      ? `wss://${url}`
      : `ws://${url}`;
  };

  const connect = async (url: string, password: string) => {
    try {
      await obs.connect(getWebSocketURL(url), password);
      setIsConnected(true);

      const { outputActive } = await obs.call("GetRecordStatus");
      setIsRecording(outputActive);

      obs.on("RecordStateChanged", (data) => {
        setIsRecording(data.outputActive);
      });

      const { inputVolumeDb } = await obs.call("GetInputVolume", {
        inputName: "Mic",
      });
      setMicVolume(inputVolumeDb);

      obs.on("InputVolumeChanged", (data) => {
        console.log({ data });
        if (data.inputName === "Mic/Aux") {
          setMicVolume(data.inputVolumeDb);
        }
      });
    } catch (error) {
      console.error("OBS WebSocket Error:", error);
      throw error;
    }
  };

  const disconnect = async () => {
    try {
      await obs.disconnect();
      setIsConnected(false);
    } catch (error) {
      console.error("Error disconnecting from OBS:", error);
    }
  };

  return (
    <OBSContext.Provider
      value={{ isConnected, isRecording, micVolume, connect, disconnect }}
    >
      {children}
    </OBSContext.Provider>
  );
}

export function useOBS() {
  const context = useContext(OBSContext);
  if (!context) {
    throw new Error("useOBS must be used within an OBSProvider");
  }
  return context;
}
