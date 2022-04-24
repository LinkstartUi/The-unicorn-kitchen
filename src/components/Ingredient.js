import React, { useState } from "react";
import IngredientId from "./IngredientId";
import "./Ingredient.css";

export default function Ingredient(props) {
  const myList = props.data;

  var idIngredient = window.location.search;
  const urlParams = new URLSearchParams(idIngredient);
  const product = idIngredient === "" ? "" : urlParams.get("ingredient");

  return (
    <>
      <form id="form-ingredient">
        <label htmlFor="strIngredient">Choisissez l'ingrédient :</label>
        <select name="ingredient" id="ingredient">
          <option value=""></option>
          {myList.map((element, i) => (
            <option key={i} value={element}>
              {element}
            </option>
          ))}
        </select>
        <input type="submit" value="Rechercher" />
      </form>
      <IngredientId id={product} />
    </>
  );
}
