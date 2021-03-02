import React, { FC } from "react";
import styled from "styled-components";
import { Button } from "../../../components/button";
import { LinkButton } from "../../../components/link-button";
import { DownloadDescription, useReceiveState } from "./use-receive-state";
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

export const Receive: FC<ReceiveProps> = ({ senderPeerID }) => {
  const { step, setStep, downloadDescriptor } = useReceiveState(senderPeerID);

  if (step === "waiting-for-approval")
    return <AcceptDownload onClick={() => setStep("init-download")} />;
  if (step === "init-download") return <Connecting />;
  if (step === "downloading") return <Connecting />;
  if (step === "complete" && downloadDescriptor)
    return <Complete downloadDescriptor={downloadDescriptor}></Complete>;
  return null;
};
