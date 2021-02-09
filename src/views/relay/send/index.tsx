import Peer from "peerjs";
import React, { FC, useEffect, useState } from "react";
import { FullScreenContainer } from "../../../components/full-screen-container";
import { servers } from "../servers";
import { DropZone } from "./drop-zone";
import { WaitingForConnection } from "./waiting-for-connections";

const Dots = () => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => setCount(count + 2), 400);

    return () => clearInterval(timer);
  });

  return (
    <>
      {Array(count % 10)
        .fill(".")
        .join("")}
    </>
  );
};

export const Send: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const hasFiles = Array.isArray(files) && files.length;
  const [urlToShare, setURLToShare] = useState<string>();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!hasFiles) return;

    const file = files[0];
    if (!file) return;

    const peer = new Peer(servers);
    peer.on("open", (id) => {
      setURLToShare(`${window.location.origin}/${id}`);
      peer.on("connection", (connection) => {
        connection.on("open", () => {
          setIsUploading(true);
          const blob = new Blob([file], { type: file.type });
          console.log(`[${connection.peer}] connected. Sending the payload...`);

          connection.send({
            type: "file:before",
            file: {
              name: file.name,
              filetype: file.type,
              size: file.size,
            },
          });

          connection.send({
            file: blob,
            filename: file.name,
            filetype: file.type,
          });
        });

        connection.on("data", (data) => {
          if (data.type === "file:upload-complete")
            return setIsUploading(false);
        });
      });
    });
  }, [files, hasFiles]);

  if (isUploading)
    return (
      <FullScreenContainer>
        <h1>
          <Dots />
        </h1>
      </FullScreenContainer>
    );

  return (
    <>
      {hasFiles && urlToShare ? (
        <WaitingForConnection urlToShare={urlToShare} />
      ) : (
        <DropZone onFile={setFiles} />
      )}
    </>
  );
};
