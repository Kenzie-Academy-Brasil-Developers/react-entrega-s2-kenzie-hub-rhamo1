import styled from "styled-components";

export const TextField = styled.input`
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px,
    5px 5px 0px 0px;
  width: 200px;
  height: 40px;

  border: 3px solid;
  font-size: 12px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: ${(props) => (props.textTransform ? "uppercase" : "none")};

  margin: 10px;
`;
