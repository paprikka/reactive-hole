import Peer from "peerjs";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../../components/button";
import { LinkButton } from "../../../components/link-button";
import { servers } from "../servers";
import waiting from "./waiting.png";

const FullScreenContainer = styled.section`
  width: 100vw;
  height: 100vh;

  display: grid;
  align-content: center;
  justify-items: center;

  h1 {
    padding: 0;
    margin: 0;
    font-size: 5vw;
    user-select: none;
  }
`;

type ReceiveProps = {
  senderPeerID: string;
};

type Steps =
  | "waiting-for-approval"
  | "init-download"
  | "downloading"
  | "complete";

type AcceptDownloadProps = { onClick: () => void };
const AcceptDownload: FC<AcceptDownloadProps> = ({ onClick }) => (
  <>
    <FullScreenContainer>
      <Button onClick={onClick}>[ Accept and download ]</Button>
    </FullScreenContainer>
  </>
);
const WaitingIcon = styled.div`
  width: 15.5vw;
  height: 14.2vw;
  background: url(${waiting});
  background-size: contain;
  background-repeat: no-repeat;
`;

const Connecting = () => (
  <FullScreenContainer>
    <WaitingIcon />
  </FullScreenContainer>
);

type CompleteProps = {
  downloadDescriptor: DownloadDescription;
};
// const CatPaw = styled.div`
//   width: 27.4vw;
//   height: 12.2vw;
//   background: url(${catPaw});
//   background-size: contain;
//   background-repeat: no-repeat;
// `;
const Complete: FC<CompleteProps> = ({ downloadDescriptor }) => (
  <>
    <FullScreenContainer>
      <LinkButton
        href={downloadDescriptor?.objectURL}
        download={downloadDescriptor?.filename}
      >
        [ Open ]{/* <CatPaw /> */}
      </LinkButton>
    </FullScreenContainer>
  </>
);

type DownloadDescription = {
  objectURL: string;
  filename: string;
};

export const Receive: FC<ReceiveProps> = ({ senderPeerID }) => {
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
        }
      });
    });
  }, [senderPeerID, step]);
  console.log(step);
  if (step === "waiting-for-approval")
    return <AcceptDownload onClick={() => setStep("init-download")} />;
  if (step === "init-download") return <Connecting />;
  if (step === "downloading") return <Connecting />;
  if (step === "complete" && downloadDescriptor)
    return <Complete downloadDescriptor={downloadDescriptor}></Complete>;
  return null;
};
