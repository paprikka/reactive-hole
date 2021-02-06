import styled from "styled-components";

export const Button = styled.button`
  background: black;
  color: white;
  border: none;
  padding: 0.5em;
  font-size: 1.25rem;
  font-family: inherit;
  font-weight: 600;

  @media all and (min-width: 400px) {
    font-size: 1.5rem;
  }

  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    background: yellow;
    color: black;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }
`;
