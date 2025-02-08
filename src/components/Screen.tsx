import { useSettings } from "../context/SettingsContext";
import { CameraPreview } from "./CameraPreview";
import { GridOVerlay } from "./GridOverlay";
import { Teleprompter } from "./Telepromter";

export const Screen = () => {
  const { showCamera, showGrid, showTeleprompter } = useSettings();
  return (
    <div className="h-screen w-screen">
      {showCamera && <CameraPreview />}
      {showTeleprompter && <Teleprompter />}
      {showGrid && <GridOVerlay />}
    </div>
  );
};
