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
    width: calc(4.25rem * 0.8);
    height: calc(6rem * 0.8);

    background: url(${lookDown});
    background-size: contain;
    background-repeat: no-repeat;
    margin: 1rem 0 3em;
    animation: ${swing} 0.5s 0s ease-in-out infinite alternate;
  }

  h2 {
    text-align: center;
    font-size: 1.25rem;
    user-select: text;

    @media all and (min-width: 400px) {
      font-size: 1.5rem;
    }
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
