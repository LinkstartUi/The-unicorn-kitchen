import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Inscriptions() {
  const { register, handleSubmit } = useForm("");
  const [dataForm, setDataForm] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [etat, setEtat] = useState("");

  const myList = [];

  const onSubmit = (data) => {
    myList.push(data.file[0]);
    myList.map((element) => {
      setName(element.name);
      setType(element.type);
      return "Success";
    });
    setDataForm(data);
  };

  useEffect(() => {
    if (dataForm.password === dataForm.confpassword) {
      axios({
        method: "POST",
        url: "http://127.0.0.1:5000/upload",
        data: {
          birthday: dataForm.birthday,
          confpassword: dataForm.confpassword,
          email: dataForm.email,
          image: name,
          type: type,
          gender: dataForm.gender,
          name: dataForm.name,
          password: dataForm.password,
          pseudo: dataForm.pseudo,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
        .then((response) => {
          console.log(response);
          setEtat(response.data.status);
        })
        .catch((errors) => console.log(errors));
    } else {
      alert("Attention mots de passe");
    }
  }, [dataForm, type, name]);

  return (
    <div className="div-inscription">
      <h1>Inscriptions</h1>
      <h3>Veuillez vous inscrire</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        encType="multipart/form-data"
        id="create-course-form"
        className="div-formulaire"
      >
        <label htmlFor="gender">Sexe :</label>
        <select
          className="label-infos"
          {...register("gender", { required: true })}
        >
          <option value="vide"></option>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
          <option value="autres">Autres</option>
        </select>
        <label htmlFor="name">Nom :</label>
        <input
          className="label-infos"
          type="text"
          {...register("name", { required: true })}
          placeholder="nom"
        />
        <label htmlFor="pseudo">Surnom :</label>
        <input
          className="label-infos"
          type="text"
          placeholder="pseudo"
          {...register("pseudo", { required: true })}
        />
        <label htmlFor="birthday">Date de naissance :</label>
        <input
          className="label-infos"
          type="date"
          {...register("birthday", { required: true })}
        />
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          className="label-infos"
          placeholder="xxxxxxx@domain.com"
          {...register("email", { required: true })}
        />
        <label htmlFor="password">Mots de passe :</label>
        <input
          type="password"
          className="label-infos"
          placeholder="mots de passe"
          {...register("password", { required: true })}
        />
        <label htmlFor="confpassword">Confirmer votre mots de passe :</label>
        <input
          type="password"
          className="label-infos"
          placeholder="mots de passe"
          {...register("confpassword", { required: true })}
        />
        <label htmlFor="picture">Charger une photo :</label>
        <input
          type="file"
          className="label-infos"
          {...register("file", { required: true })}
          id="file"
          name="file"
        />
        <input type="submit" value="Inscription" />
      </form>
      <h3>{etat}</h3>
      {etat === "Votre compte est créé" && (
        <Link to="/connexion">
          <button>Me connecter</button>
        </Link>
      )}
    </div>
  );
}
