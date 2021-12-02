import "./styles";
import { Button } from "./styles";

export const Btn = ({
  // primaryColor = false,
  placeholder,
  clickFunction,
  type,
}) => {
  return (
    <>
      <Button onClick={clickFunction} type={type}>
        {placeholder}
      </Button>
    </>
  );
};
