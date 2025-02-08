import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactNode, createContext, useContext } from "react";

interface SettingsValues {
  content: string;
  fontSize: number;
  vMargin: number;
  hMargin: number;
  lineSpacing: number;
  textAlign: string;
  speed: number;
  direction: string;
  showIndicator: boolean;
  scrolling: boolean;
  recording: boolean;
}

export interface SettingsContextType extends SettingsValues {
  setContent: (content: string) => void;
  setFontSize: (fontSize: number) => void;
  setVMargin: (vMargin: number) => void;
  setHMargin: (hMargin: number) => void;
  setLineSpacing: (lineSpacing: number) => void;
  setTextAlign: (textAlign: string) => void;
  setSpeed: (speed: number) => void;
  setDirection: (direction: string) => void;
  setShowIndicator: (showIndicator: boolean) => void;
  setScrolling: (scrolling: boolean) => void;
  setRecording: (recording: boolean) => void;
  reset: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

const initialValue: SettingsValues = {
  content: "Enter your script here...",
  fontSize: 24,
  vMargin: 20,
  hMargin: 20,
  lineSpacing: 1.5,
  textAlign: "center",
  speed: 1,
  direction: "ltr",
  showIndicator: true,
  scrolling: false,
  recording: false,
};

export const SettingsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [settings, setSettings] = useLocalStorage<SettingsValues>(
    "settings",
    initialValue,
  );

  const setContent = (content: string) =>
    setSettings((prev) => ({ ...prev, content }));
  const setFontSize = (fontSize: number) =>
    setSettings((prev) => ({ ...prev, fontSize }));
  const setVMargin = (vMargin: number) =>
    setSettings((prev) => ({ ...prev, vMargin }));
  const setHMargin = (hMargin: number) =>
    setSettings((prev) => ({ ...prev, hMargin }));
  const setLineSpacing = (lineSpacing: number) =>
    setSettings((prev) => ({ ...prev, lineSpacing }));
  const setTextAlign = (textAlign: string) =>
    setSettings((prev) => ({ ...prev, textAlign }));
  const setSpeed = (speed: number) =>
    setSettings((prev) => ({ ...prev, speed }));
  const setDirection = (direction: string) =>
    setSettings((prev) => ({ ...prev, direction }));
  const setShowIndicator = (showIndicator: boolean) =>
    setSettings((prev) => ({ ...prev, showIndicator }));
  const setScrolling = (scrolling: boolean) =>
    setSettings((prev) => ({ ...prev, scrolling }));
  const setRecording = (recording: boolean) =>
    setSettings((prev) => ({ ...prev, recording }));

  const reset = () => setSettings(initialValue);

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        setContent,
        setFontSize,
        setVMargin,
        setHMargin,
        setLineSpacing,
        setTextAlign,
        setSpeed,
        setDirection,
        setShowIndicator,
        setScrolling,
        setRecording,
        reset,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  const data = useContext(SettingsContext);
  if (!data) throw new Error("Edit lab context data missing");
  return data;
}
