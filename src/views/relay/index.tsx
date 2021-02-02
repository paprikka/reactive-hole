import React, { FC, useState } from "react";
import { Receive } from "./receive";
import { Send } from "./send";

const getID = () => window.location.pathname.split("/").slice(-1)[0] || null;

export const RelayView: FC = () => {
  const [id] = useState<string | null>(getID);

  if (id) return <Receive senderPeerID={id} />;
  return <Send />;
};
