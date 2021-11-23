import { motion } from "framer-motion";
import { Btn } from "../../components/Button";
import { Input } from "../../components/Input";
import "./styles.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export const Home = () => {
  let history = useHistory();

  const handleClick = () => {
    history.push("/sign");
  };

  const handleLogin = () => {
    history.push("/userhome");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        <h1>KenzieHub</h1>
        <Input placeholder="login" textTransform={false} />
        <Input placeholder="senha" type="password" textTransform={false} />
        <Btn
          clickFunction={handleLogin}
          onClick={() => handleLogin}
          placeholder="logar"
        />
        <span className="textContainer">
          <p>Não possui cadastro? </p>
          <Btn
            clickFunction={handleClick}
            onClick={() => handleClick}
            placeholder="cadastrar"
          />
        </span>
      </div>
    </motion.div>
  );
};
