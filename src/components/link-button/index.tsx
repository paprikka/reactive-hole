import styled from "styled-components";

export const LinkButton = styled.a`
  background: black;
  color: white;
  border: none;
  padding: 0.5em;
  font-size: 1.25rem;
  font-family: inherit;
  text-decoration: none;
  font-weight: 600;

  cursor: pointer;

  @media all and (min-width: 400px) {
    font-size: 1.5rem;
  }

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
