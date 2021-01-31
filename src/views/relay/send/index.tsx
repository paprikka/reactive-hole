import Peer from "peerjs";
import React, { FC, useEffect, useState } from "react";
import { servers } from "../servers";
import { DropZone } from "./drop-zone";
import { WaitingForConnection } from "./waiting-for-connections";

export const Send: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const hasFiles = Array.isArray(files) && files.length;
  const [urlToShare, setURLToShare] = useState<string>();

  useEffect(() => {
    if (!hasFiles) return;

    const file = files[0];
    if (!file) return;

    const peer = new Peer(servers);
    peer.on("open", (id) => {
      setURLToShare(`${window.location.origin}/${id}`);
      peer.on("connection", (connection) => {
        connection.on("open", () => {
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
      });
    });
  }, [files, hasFiles]);

  return hasFiles && urlToShare ? (
    <WaitingForConnection urlToShare={urlToShare} />
  ) : (
    <DropZone onFile={setFiles} />
  );
};
