import { motion } from "framer-motion";
import { Btn } from "../../components/Button";
import "./styles.css";
import { useHistory } from "react-router";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const UserHome = () => {
  const history = useHistory();

  const [userData] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || []
  );

  const [techs, setTechs] = useState(
    JSON.parse(localStorage.getItem("techs")) || []
  );
  const [array, setArray] = useState([]);

  const logout = () => {
    window.localStorage.clear();
    history.push("/");
    toast("Até breve!", {
      icon: "👏",
    });
  };

  const copyPhone = () => {
    toast.success("telefone copiado para a àrea de transferência");
    navigator.clipboard.writeText(userData.contact);
  };

  const copyMail = () => {
    navigator.clipboard.writeText(userData.email);
    toast.success("email copiado para a àrea de transferência");
  };

  const [counter, setCounter] = useState(300);

  useEffect(() => {
    setArray(Object.values(techs));
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  ///////

  const token = JSON.parse(localStorage.getItem("authToken"));

  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório!!"),
    status: yup.string().required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addTech = (tech) => {
    console.log(tech);
    api
      .post("/users/techs", tech, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        toast.success("sucesso!");
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
        console.log(errors);
        toast.error(`Algo de errado não está certo... ${err}`);
      });
  };

  console.log(token);

  return (
    <>
      {JSON.parse(localStorage.getItem("authToken")) ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="homeContainer"
        >
          <div className="mainContainer">
            <div className="techs">
              <div className="tech--div box">
                <h2>Minhas tecnologias:</h2>

                <>
                  {techs.map(({ title, status }, key) => (
                    <ul>
                      <li key={key}>
                        <h3>Tech: {title}</h3>
                        <p>Status: {status}</p>
                      </li>
                    </ul>
                  ))}
                </>
                <form onSubmit={handleSubmit(addTech)}>
                  <input
                    placeholder="title"
                    type="text"
                    {...register("title")}
                  />
                  <input
                    placeholder="status"
                    type="text"
                    {...register("status")}
                  />
                  <Btn placeholder="+" />
                </form>

                {/* falta adicionar novas techs */}
              </div>
            </div>
            <div className="userProfile box">
              <h2>{userData.name}</h2>

              <h3>Sobre:</h3>
              <p>{userData.bio}</p>
              <p></p>

              <p>
                <h4>Módulo:</h4>
                {userData.course_module}
              </p>
              <Btn
                placeholder="ligar agora"
                onClick={copyPhone}
                clickFunction={copyPhone}
              />
              <Btn
                placeholder="enviar e-mail"
                onClick={copyMail}
                clickFunction={copyMail}
              />
              <Btn placeholder="Sair" onClick={logout} clickFunction={logout} />
              {/* <p className="counter">Fim da sessão: {counter} segundos</p> */}
            </div>
          </div>
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
