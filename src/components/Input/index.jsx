import { TextField } from "./styles";

export const Input = ({ placeholder, type, textTransform }) => {
  return (
    <>
      <TextField
        textTransform={textTransform}
        className="box"
        placeholder={placeholder}
        type={type}
      />
    </>
  );
};
