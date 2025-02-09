import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useOBS } from "@/context/OBSContext";
import { Label } from "./ui/label";

export function OBSConnection() {
  const { isConnected, connect, disconnect, isRecording } = useOBS();
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState("localhost:4455");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      await connect(url, password);
      setModalOpen(false);
    } catch (err) {
      console.log({ err });
      alert("Failed to connect to OBS. Check the URL & password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isRecording ? (
        <Button variant="destructive" disabled>
          Recording
        </Button>
      ) : (
        <Button
          variant={isConnected ? "success" : "outline"}
          onClick={() => (isConnected ? disconnect() : setModalOpen(true))}
        >
          {isConnected ? "Connected to OBS" : "Connect to OBS"}
        </Button>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-96">
          <DialogTitle>Connect to OBS</DialogTitle>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="url">WebSocket URL</Label>
              <Input
                name="url"
                type="text"
                placeholder="OBS WebSocket URL (e.g., localhost:4455)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password (optional)</Label>
              <Input
                name="password"
                type="password"
                placeholder="OBS WebSocket Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConnect} disabled={loading || !url}>
              {loading ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
