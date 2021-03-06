import { motion } from "framer-motion";
import { useHistory } from "react-router";
import { Btn } from "../../components/Button";
// import { Input } from "../../components/Input";
import { api } from "../../services/api";
import "./styles.css";

// import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";

export const SignUp = () => {
  let history = useHistory();

  const schema = yup.object().shape({
    email: yup.string().required("Campo obrigatório!!"),
    password: yup.string().required("Campo obrigatório!"),
    name: yup.string().required("Campo obrigatório!"),
    bio: yup.string().required("Campo obrigatório!"),
    contact: yup.string().required("Campo obrigatório!"),
    course_module: yup.string().required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClick = () => {
    history.push("/");
  };

  const handleForm = (user) => {
    console.log(user);
    api
      .post("/users", user)
      .then((res) => {
        console.log(res);
        toast.success("sucesso!");
        history.push("/");
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
        console.log(errors);
        toast.error(`Algo de errado não está certo... ${err}`);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="centered"
    >
      <h1>Novo cadastro</h1>
      <form onSubmit={handleSubmit(handleForm)}>
        <input name="name" placeholder="nome" {...register("name")} />
        {errors.name && errors.name.message}
        <input name="email" placeholder="email" {...register("email")} />
        {errors.email && errors.email.message}

        <input name="bio" placeholder="bio" {...register("bio")} />
        {errors.bio && errors.bio.message}
        <input name="contact" placeholder="contato" {...register("contact")} />
        {errors.contact && errors.contact.message}
        {/* <h4>Selecionar módulo</h4> */}
        <input
          name="course_module"
          placeholder="módulo: 1 ~ 4"
          {...register("course_module")}
        />
        {errors.course_module && errors.course_module.message}
        <input
          type="password"
          name="password"
          placeholder="senha "
          {...register("password")}
        />
        {errors.password && errors.password.message}
        <input type="password" placeholder="confirmar senha" />
        <button placeholder="cadastrar" type="submit">
          cadastrar{" "}
        </button>
        <span className="textContainer">
          Já possui cadastro?
          <Btn
            clickFunction={handleClick}
            handleClick={handleClick}
            placeholder="logar"
          ></Btn>
        </span>
      </form>
    </motion.div>
  );
};
