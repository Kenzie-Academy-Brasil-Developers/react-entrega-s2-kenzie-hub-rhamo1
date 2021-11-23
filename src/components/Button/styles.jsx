import styled from "styled-components";

export const Button = styled.button`
  border: 3px solid;
  font-size: 12px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000;

  cursor: pointer;
  padding: 1em 1em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px,
    5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 150px;
  margin: 10px;

  &:hover {
    text-transform: none;
  }

  &:active {
    box-shadow: 0px 0px 0px 0px;
    top: 5px;
    left: 5px;
  }
`;
