import "./styles.css";

import { Btn } from "../../components/Button";

import { useHistory } from "react-router-dom";

import { motion } from "framer-motion";

// import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { api } from "../../services/api";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const Home = ({ userData, setUserData }) => {
  const schema = yup.object().shape({
    email: yup.string().required("Campo obrigatório!!"),
    password: yup.string().required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // setTimeout(() => {
  //   window.localStorage.clear();
  // }, 300000);

  const handleForm = (user) => {
    console.log(user);
    api
      .post("/sessions", { ...user })
      .then((res) => {
        setUserData([res.data.user]);
        localStorage.setItem("authToken", JSON.stringify(res.data.token));
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        localStorage.setItem("techs", JSON.stringify(res.data.user.techs));
        toast("Que bom você por aqui!", {
          icon: "👏",
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(userData);
    if (localStorage.getItem("authToken")) {
      history.push("/userhome");
    }
  }, [userData]);

  let history = useHistory();

  const handleClick = () => {
    history.push("/signup");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="centered">
        <h1>KenzieHub</h1>
        <form onSubmit={handleSubmit(handleForm)}>
          <input
            className="field"
            placeholder="login"
            type="text"
            textTransform={false}
            {...register("email")}
          />
          <input
            className="field"
            placeholder="senha"
            type="password"
            textTransform={false}
            {...register("password")}
          />
          <button placeholder="logar" type="submit">
            logar
          </button>
        </form>
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
