import styled from "styled-components";

export const FullScreenContainer = styled.section`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    padding: 0;
    margin: 0;
    font-size: 5vw;
    user-select: none;
  }
`;
