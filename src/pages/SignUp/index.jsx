import { motion } from "framer-motion";
import { useState } from "react";
import { useHistory } from "react-router";
import { Btn } from "../../components/Button";
import { Input } from "../../components/Input";
import "./styles.css";

export const SignUp = () => {
  let history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  const [isChecked, setIsChecked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Novo cadastro</h1>
      <Input placeholder="username" />
      <Input placeholder="email" />
      <Input placeholder="bio" />
      <Input placeholder="contato" />
      {/* <h4>Selecionar módulo</h4> */}
      <Input placeholder="módulo: 1 ~ 4" />

      <Input placeholder="senha " />
      <Input placeholder="confirmar senha" />
      <Btn placeholder="cadastrar" />
      <span className="textContainer">
        Já possui cadastro?
        <Btn
          clickFunction={handleClick}
          handleClick={handleClick}
          placeholder="logar"
        ></Btn>
      </span>
    </motion.div>
  );
};
