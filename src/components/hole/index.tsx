import styled from "styled-components";
import hole from "./hole.png";

export const Hole = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 30%;
  background: url(${hole});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  transform: ${({ isActive }) => (isActive ? "scale(1.2)" : "none")};
`;
