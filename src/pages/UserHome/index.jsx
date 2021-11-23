import { motion } from "framer-motion";
import { Btn } from "../../components/Button";
import "./styles.css";

export const UserHome = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="homeContainer"
    >
      <div className="techs">
        <div className="tech--div box">
          <h2>Minhas tecnologias</h2>
          <Btn placeholder="+" />
        </div>
        <div className="tech--div box">
          <h2>Meus trabalhos</h2>
          <Btn placeholder="+" />
        </div>
      </div>
      <div className="userProfile box">
        <h2>Nome do fulano</h2>
        <Btn placeholder="Sair" />
      </div>
    </motion.div>
  );
};
