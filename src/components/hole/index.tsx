import styled from "styled-components";
import hole from "./hole.png";

export const Hole = styled.div<{ isActive: boolean }>`
  width: 27.4vw;
  height: 12.2vw;
  background: url(${hole});
  background-size: contain;
  background-repeat: no-repeat;

  transform: ${({ isActive }) => (isActive ? "scale(1.2)" : "none")};
`;
