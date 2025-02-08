import { useEffect, useRef, useState } from "react";

export function CameraPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    async function getCameras() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setHasPermission(true);
        stream.getTracks().forEach((track) => track.stop()); // Stop initial stream

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput",
        );
        setCameras(videoDevices);

        if (videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.log({ error });
        setHasPermission(false);
      }
    }

    getCameras();
  }, []);

  useEffect(() => {
    async function startCamera() {
      if (selectedCamera && videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedCamera } },
        });
        videoRef.current.srcObject = stream;
      }
    }

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [selectedCamera]);

  return (
    <div className="absolute inset-0 flex h-full w-full flex-col items-center">
      {hasPermission === false ? (
        <p className="text-red-500">
          Camera access is denied. Please enable permissions.
        </p>
      ) : (
        <>
          <select
            className="mt-2 rounded-md border p-2"
            value={selectedCamera || ""}
            onChange={(e) => setSelectedCamera(e.target.value)}
          >
            {cameras.map((camera) => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label || "Unknown Camera"}
              </option>
            ))}
          </select>

          <div className="relative mt-4 h-full w-full bg-black">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              playsInline
              muted
            />
          </div>
        </>
      )}
    </div>
  );
}
