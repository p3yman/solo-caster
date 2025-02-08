import { useSettings } from "@/context/SettingsContext";
import { useEffect, useRef, useState } from "react";

export function CameraPreview() {
  const { selectedCamera, setSelectedCamera } = useSettings();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

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

        if (videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.log(error);
        setHasPermission(false);
      }
    }

    getCameras();
  }, [setSelectedCamera]);

  useEffect(() => {
    async function startCamera() {
      if (!selectedCamera || !videoRef.current) return;

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        videoRef.current.srcObject = null;
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
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
          streamRef.current?.removeTrack(track);
        });
        streamRef.current = null;
        if (videoRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          videoRef.current.srcObject = null;
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
        <div className="relative h-full w-full">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            playsInline
            muted
          />
        </div>
      )}
    </div>
  );
}
