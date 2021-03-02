import Peer from "peerjs";
import { useEffect, useState } from "react";
import { servers } from "../servers";

export type DownloadDescription = {
  objectURL: string;
  filename: string;
};

export type Steps =
  | "waiting-for-approval"
  | "init-download"
  | "downloading"
  | "complete";

export const useReceiveState = (senderPeerID) => {
  const [step, setStep] = useState<Steps>("waiting-for-approval");
  const [
    downloadDescriptor,
    setDownloadDescriptor,
  ] = useState<DownloadDescription>();

  useEffect(() => {
    if (!senderPeerID) return;
    if (step !== "init-download") return;
    const peer = new Peer(servers);

    peer.on("open", () => {
      const connection = peer.connect(senderPeerID);
      connection.on("data", (data) => {
        if (data.type === "file:before") return setStep("downloading");
        if ("file" in data) {
          setDownloadDescriptor({
            objectURL: URL.createObjectURL(
              new Blob([data.file], {
                type: data.filetype as string,
              })
            ),
            filename: data.filename as string,
          });
          setStep("complete");

          connection.send({ type: "file:upload-complete" });
        }
      });
    });
  }, [senderPeerID, step]);

  return {
    setStep,
    step,
    downloadDescriptor,
  };
};
