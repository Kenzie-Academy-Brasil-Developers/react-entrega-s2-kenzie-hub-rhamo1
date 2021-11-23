import { motion } from "framer-motion";
import { Btn } from "../../components/Button";
import "./styles.css";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserHome = ({ userData }) => {
  const history = useHistory();

  const logout = () => {
    console.log("clicou");
    window.localStorage.clear();
    history.push("/");
  };

  return (
    <>
      {window.localStorage.getItem("authToken") ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="homeContainer"
        >
          {userData.map((user) => {
            return (
              <>
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
                  <h2>{user.data.user.name}</h2>
                  <p>
                    <h4>E-mail:</h4> {user.data.user.email}
                  </p>
                  <p>
                    <h4>Módulo:</h4> {user.data.user.course_module}
                  </p>
                  <Btn
                    placeholder="Sair"
                    onClick={logout}
                    clickFunction={logout}
                  />
                </div>
              </>
            );
          })}
        </motion.div>
      ) : (
        <>
          Pera lá espertinho!!! Você deve estar logado para acessar esta página.
          <Link to="/">Voltar para o login</Link>
        </>
      )}
    </>
  );
};
