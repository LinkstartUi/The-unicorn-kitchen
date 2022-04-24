import React from "react";
import { useLocation } from "react-router-dom";

export default function User() {
  const id = useLocation();
  const userId = id.state.id;

  const handleSubmit = () => {};
  const handleDelete = () => {};

  return (
    <div>
      <div>
        <h1>Mon Profil</h1>
        <img src="" alt="" />
        <p>
          Civilit : <span></span>
        </p>
        <p>
          Inscrit depuis le : <span></span>
        </p>
        <p>
          Nom : <span></span>
        </p>
        <p>
          Pseudo : <span></span>
        </p>
        <p>
          Email : <span></span>
        </p>
        <p>
          Date de naissance : <span></span>
        </p>
      </div>
      <div>
        <h3>Mes infos perso</h3>
        <form method="put">
          <label htmlFor="gender">Sexe :</label>
          <select name="gender">
            <option value="vide"></option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
            <option value="autres">Autres</option>
          </select>
          <label htmlFor="name">Nom :</label>
          <input type="text" name="name" placeholder="nom" />
          <label htmlFor="pseudo">Surnom :</label>
          <input type="text" name="pseudo" placeholder="pseudo" />
          <label htmlfor="birthday">Date de naissance :</label>
          <input type="date" name="birthday" />
          <label htmlFor="email">Email :</label>
          <input type="email" name="email" placeholder="xxxxxxx@domain.com" />
          <label htmlFor="password">Mots de passe :</label>
          <input type="password" name="password" placeholder="mots de passe" />
          <label htmlFor="confpassword">Confirmer votre mots de passe :</label>
          <input
            type="password"
            name="confpassword"
            placeholder="mots de passe"
          />
          <label htmlFor="picture">Charger une photo :</label>
          <input type="file" name="picture" />
          <input type="submit" value="Enregistrer" onSubmit={handleSubmit} />
        </form>
      </div>
      <div>
        <button onClick={handleDelete}>Suppression</button>
      </div>
    </div>
  );
}
