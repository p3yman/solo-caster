import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings } from "@/context/SettingsContext";

export function CameraSelector() {
  const { selectedCamera, setSelectedCamera } = useSettings();
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    async function getCameras() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setHasPermission(true);
        stream.getTracks().forEach((track) => track.stop());

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput",
        );
        setCameras(videoDevices);

        if (videoDevices.length > 0 && !selectedCamera) {
          setSelectedCamera(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.log(error);
        setHasPermission(false);
      }
    }

    getCameras();
  }, [selectedCamera, setSelectedCamera]);

  if (hasPermission === false) {
    return (
      <p className="text-red-500">
        Camera access is denied. Please enable permissions.
      </p>
    );
  }

  return (
    <Select value={selectedCamera || ""} onValueChange={setSelectedCamera}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Camera" />
      </SelectTrigger>
      <SelectContent>
        {cameras.map((camera) => (
          <SelectItem key={camera.deviceId} value={camera.deviceId}>
            {camera.label || "Unknown Camera"}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
