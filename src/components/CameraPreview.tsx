import { useEffect, useRef, useState } from "react";

export function CameraPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const streamRef = useRef<MediaStream | null>(null); // 🔥 Track the active stream

  useEffect(() => {
    async function getCameras() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setHasPermission(true);
        stream.getTracks().forEach((track) => track.stop()); // Stop initial request

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput",
        );
        setCameras(videoDevices);

        if (videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0].deviceId);
        }
      } catch (error) {
        setHasPermission(false);
      }
    }

    getCameras();
  }, []);

  useEffect(() => {
    async function startCamera() {
      if (!selectedCamera || !videoRef.current) return;

      // 🔥 Fully release any existing camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        videoRef.current.srcObject = null; // 🔥 Clear the video element reference
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedCamera } },
        });

        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }

    startCamera();

    return () => {
      // 🔥 Ensure camera fully releases when unmounting
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
          streamRef.current?.removeTrack(track); // 🔥 Remove track explicitly
        });
        streamRef.current = null;
        if (videoRef.current) {
          videoRef.current.srcObject = null; // 🔥 Clear video reference
        }
      }
    };
  }, [selectedCamera]);

  return (
    <div className="absolute inset-0 flex w-full flex-col items-center">
      {hasPermission === false ? (
        <p className="text-red-500">
          Camera access is denied. Please enable permissions.
        </p>
      ) : (
        <>
          <select
            className="mt-2 rounded-md p-2"
            value={selectedCamera || ""}
            onChange={(e) => setSelectedCamera(e.target.value)}
          >
            {cameras.map((camera) => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label || "Unknown Camera"}
              </option>
            ))}
          </select>

          <div className="relative h-full w-full">
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
