import React, { useState, FC } from "react";
import { FullScreenContainer } from "../../../components/full-screen-container";
import styled, { keyframes, css } from "styled-components";
import lookDown from "./look-down.png";
import { Button } from "../../../components/button";

const swing = keyframes`
    from {
      transform: translateY(-5%);
    }
    50% {
      transform: translateY();
    }
    to {
      transform: translateY(+30%);
    }
`;

const WaitingForConnectionBase = styled(FullScreenContainer)`
  .look-down {
    width: 8.5vw;
    height: 12vw;
    background: url(${lookDown});
    background-size: contain;
    background-repeat: no-repeat;
    margin: 2vw 0 5vw;
    animation: ${swing} 0.5s 0s ease-in-out infinite alternate;
  }

  h2 {
    font-size: 1rem;
    user-select: text;
  }
`;

const flash = keyframes`
  from{opacity: 0}
  2%{opacity: 1}
  80%{opacity: 1}
  to{opacity: 0}
`;
const CopiedLabel = styled.div<{ isVisible: boolean }>`
  padding: 1rem;
  opacity: 0;

  ${({ isVisible }) => (isVisible ? css`animation ${flash} 3s 0s both;` : "")};
`;

type Props = {
  urlToShare: string;
};
export const WaitingForConnection: FC<Props> = ({ urlToShare }) => {
  const [copiedTimes, setCopiedTimes] = useState(0);
  const handleURLClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(urlToShare);
    setCopiedTimes(copiedTimes + 1);
  };

  return (
    <WaitingForConnectionBase>
      <h2>Share this link with a friend</h2>
      <div className="look-down" />
      <Button onClick={handleURLClick}>[ copy URL to clipboard ]</Button>
      <CopiedLabel isVisible={!!copiedTimes} key={copiedTimes}>
        [ copied ]
      </CopiedLabel>
    </WaitingForConnectionBase>
  );
};
