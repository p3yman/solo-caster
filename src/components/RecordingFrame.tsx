import { useOBS } from "@/context/OBSContext";

export const RecordingFrame = () => {
  const { isRecording } = useOBS();

  if (!isRecording) return null;

  return <div className="fixed inset-4 z-50 border-8 border-red-500/50"></div>;
};
