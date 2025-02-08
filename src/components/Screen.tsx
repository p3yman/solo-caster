import { useSettings } from "../context/SettingsContext";
import { CameraPreview } from "./CameraPreview";
import { GridOVerlay } from "./GridOverlay";
import { Teleprompter } from "./Telepromter";

export const Screen = () => {
  const { cameraPreview, grid } = useSettings();
  return (
    <div className="aspect-video w-screen border border-white bg-black text-white">
      {cameraPreview && <CameraPreview />}
      <Teleprompter />
      {grid && <GridOVerlay />}
    </div>
  );
};
