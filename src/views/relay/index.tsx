import React, { useState, useEffect, FC } from "react";
import { Receive } from "./receive";
import { Send } from "./send";

const getID = () => window.location.pathname.split("/").slice(-1)[0] || null;
type Mode = "sender" | "receiver";
export const RelayView: FC = () => {
  const [mode] = useState<Mode>(() => (getID() ? "receiver" : "sender"));

  if (mode === "receiver") return <Receive />;
  return <Send />;
};
