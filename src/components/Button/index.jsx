import "./styles";
import { Button } from "./styles";

export const Btn = ({ placeholder, clickFunction }) => {
  return (
    <>
      <Button onClick={clickFunction}>{placeholder}</Button>
    </>
  );
};
