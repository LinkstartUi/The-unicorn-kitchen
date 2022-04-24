import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Connexion() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState("");
  const [etat, setEtat] = useState("");
  const [mdp, setMdp] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm("");
  const onSubmit = (data) => {
    setData(data);
  };

  useEffect(() => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/connexion",
      data: data,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    })
      .then((response) => {
        console.log(response);
        setEtat(response.data);
      })
      .catch((errors) => console.log(errors));
  }, [data]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/connexion",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((errors) => console.log(errors));
  }, []);

  useEffect(() => {
    axios({
      method: "PUT",
      url: "http://127.0.0.1:5000/mdpperdu",
      data: data,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    })
      .then((response) => {
        console.log(response);
        setMdp(response.data.status);
      })
      .catch((errors) => console.log(errors));
  }, [data]);

  return (
    <div>
      <h1>Bienvenue</h1>
      <h3>Veuillez vous connectez</h3>
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="xxxxxx@domain.com"
          {...register("email", { required: true })}
        />
        <label htmlFor="password">Mots de passe</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <input type="submit" name="submit" value="Connexion" />
      </form>
      <h6>
        Connexion : <span>{etat[0]}</span>
      </h6>
      {etat[0] === "accordé" && (
        <Link to={`user/${etat[1]}`}>
          <button>Mon Compte</button>
        </Link>
      )}
      <div>
        <Button onClick={handleOpen}>Mots de passe oublié</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form method="PUT" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="xxxxxx@domain.com"
                {...register("confmail", { required: true })}
              />
              <label htmlFor="birthday">Date de naissance :</label>
              <input
                type="date"
                name="birthday"
                {...register("confbirthday", { required: true })}
              />
              <label htmlFor="password">Nouveau mots de passe</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                {...register("confpassword", { required: true })}
              />
              <label htmlFor="confpassword">
                Confirmer votre mots de passe :
              </label>
              <input
                type="password"
                name="confpassword"
                placeholder="mots de passe"
                {...register("confconfpassword", { required: true })}
              />
              <input type="submit" name="submit" value="Enregistré" />
              <h5>{mdp}</h5>
              {mdp === "Votre password est modifié" && (
                <Link to="/connexion">
                  <button>Me connecter</button>
                </Link>
              )}
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
