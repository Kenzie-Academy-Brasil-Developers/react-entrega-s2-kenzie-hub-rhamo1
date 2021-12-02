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
import axios from "axios";

export const UserHome = () => {
  const history = useHistory();

  const [userData] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || []
  );

  const [techs, setTechs] = useState(
    JSON.parse(localStorage.getItem("techs")) || []
  );
  const [userTechs, setUserTechs] = useState([]);
  const [user, setUser] = useState({});

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

  useEffect(() => {
    axios
      .get("https://kenziehub.herokuapp.com/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserTechs(response.data.techs);
      })
      .catch((e) => console.log(e));
  }, [userTechs]);

  const addTech = (tech) => {
    console.log(tech);
    api
      .post("/users/techs", tech, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success("sucesso!");
      })
      .catch((err) => {
        setError(err.message);

        toast.error(`Essa tech já existe!`);
      });
  };

  const deleteTech = (techId) => {
    axios.delete(`https://kenziehub.herokuapp.com/users/techs/${techId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setTechs(userTechs.filter((tech) => tech.id !== techId));
    console.log(userTechs);
  };

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
                  {userTechs.map(({ title, status, id }, key) => (
                    <ul>
                      <li key={key} className="techCard">
                        <p>
                          {title} ({status})
                        </p>

                        <button className="box" onClick={() => deleteTech(id)}>
                          -
                        </button>
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
                  <p className="error">
                    {errors.title && errors.title.message}
                  </p>

                  <input
                    placeholder="status"
                    type="text"
                    {...register("status")}
                  />

                  <p className="error">
                    {errors.status && errors.status.message}
                  </p>

                  <Btn placeholder="+" />
                </form>

                {/* falta adicionar novas techs */}
              </div>
            </div>
            <div className="userProfile box">
              <h3>{userData.name}</h3>

              <h4>Sobre:</h4>
              <p>{userData.bio}</p>
              <p></p>

              <p>
                <h4>Módulo:</h4>
                {userData.course_module}
              </p>
              <Btn
                primaryColor="false"
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
