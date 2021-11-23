import "./styles";
import { Button } from "./styles";

export const Btn = ({ placeholder, clickFunction, type }) => {
  return (
    <>
      <Button onClick={clickFunction} type={type}>
        {placeholder}
      </Button>
    </>
  );
};
