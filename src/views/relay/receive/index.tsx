import React, { useState, FC } from "react";
import styled from "styled-components";

const FullScreenContainer = styled.section`
  width: 100vw;
  height: 100vh;

  display: grid;
  align-items: center;
  justify-content: center;

  h1 {
    padding: 0;
    margin: 0;
    font-size: 5vw;
    user-select: none;
  }
`;

export const Receive: FC = () => (
  <FullScreenContainer>
    <h1>Waiting for stream...</h1>
  </FullScreenContainer>
);
