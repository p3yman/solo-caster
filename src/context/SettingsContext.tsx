import { exampleText } from "@/lib/exampleText";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactNode, createContext, useContext } from "react";

type TextAlign = "left" | "center" | "right";
type Direction = "ltr" | "rtl";

interface SettingsValues {
  content: string;
  fontSize: number;
  vMargin: number;
  hMargin: number;
  lineSpacing: number;
  speed: number;
  textAlign: TextAlign;
  direction: Direction;
  showIndicator: boolean;
  scrolling: boolean;
  recording: boolean;
  showCamera: boolean;
  showGrid: boolean;
  showTeleprompter: boolean;
}

export interface SettingsContextType extends SettingsValues {
  setContent: (content: string) => void;
  setFontSize: (fontSize: number) => void;
  setVMargin: (vMargin: number) => void;
  setHMargin: (hMargin: number) => void;
  setLineSpacing: (lineSpacing: number) => void;
  setSpeed: (speed: number) => void;
  setTextAlign: (textAlign: TextAlign) => void;
  setDirection: (direction: Direction) => void;
  setShowIndicator: (showIndicator: boolean) => void;
  setScrolling: (scrolling: boolean) => void;
  setRecording: (recording: boolean) => void;
  setShowCamera: (cameraPreview: boolean) => void;
  setShowGrid: (grid: boolean) => void;
  setShowTeleprompter: (showTeleprompter: boolean) => void;
  reset: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

const initialValue: SettingsValues = {
  content: exampleText,
  fontSize: 86,
  vMargin: 0,
  hMargin: 300,
  lineSpacing: 2,
  textAlign: "center",
  speed: 14,
  direction: "ltr",
  showIndicator: true,
  scrolling: false,
  recording: false,
  showCamera: true,
  showTeleprompter: true,
  showGrid: true,
};

export const SettingsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [settings, setSettings] = useLocalStorage<SettingsValues>(
    "solo_caster_settings",
    initialValue,
  );

  const setContent = (content: string) =>
    setSettings(() => ({ ...settings, content }));
  const setFontSize = (fontSize: number) =>
    setSettings(() => ({ ...settings, fontSize }));
  const setVMargin = (vMargin: number) =>
    setSettings(() => ({ ...settings, vMargin }));
  const setHMargin = (hMargin: number) =>
    setSettings(() => ({ ...settings, hMargin }));
  const setLineSpacing = (lineSpacing: number) =>
    setSettings(() => ({ ...settings, lineSpacing }));
  const setTextAlign = (textAlign: TextAlign) =>
    setSettings(() => ({ ...settings, textAlign }));
  const setSpeed = (speed: number) =>
    setSettings(() => ({ ...settings, speed }));
  const setDirection = (direction: Direction) =>
    setSettings(() => ({ ...settings, direction }));
  const setShowIndicator = (showIndicator: boolean) =>
    setSettings(() => ({ ...settings, showIndicator }));
  const setScrolling = (scrolling: boolean) =>
    setSettings(() => ({ ...settings, scrolling }));
  const setRecording = (recording: boolean) =>
    setSettings(() => ({ ...settings, recording }));
  const setShowCamera = (showCamera: boolean) =>
    setSettings(() => ({ ...settings, showCamera }));
  const setShowGrid = (showGrid: boolean) =>
    setSettings(() => ({ ...settings, showGrid }));
  const setShowTeleprompter = (showTeleprompter: boolean) =>
    setSettings(() => ({ ...settings, showTeleprompter }));

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
        setShowCamera,
        setShowGrid,
        setShowTeleprompter,
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
