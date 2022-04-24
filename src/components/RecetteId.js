import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./RecetteId.css";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

const axios = require("axios").default;

export default function RecetteID() {
  const params = useLocation();
  const dataEx = params.state.id;
  console.log(dataEx);
  const url =
    "https://www.themealdb.com/api/json/v1/1/lookup.php?key=1&i=" + dataEx;
  const [recipe, setRecipe] = useState(null);
  console.log(recipe);

  useEffect(() => {
    axios.get(url).then((response) => {
      setRecipe(response.data.meals);
    });
  }, []);

  if (!recipe) return null;

  return (
    <div className="parent">
      <div className="div1">
        <div className="favoris">
          <h1>{recipe[0].strMeal}</h1>

          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
        </div>
      </div>

      <div className="div2">
        <img src={recipe[0].strMealThumb}></img>
      </div>

      <div className="div3">
        <table>
          <thead>
            <tr>
              <th>
                <h2>Ingredients</h2>
              </th>
              <th>
                <h2>Quantité</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{recipe[0].strIngredient1}</td>
              <td>{recipe[0].strMeasure1}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient2}</td>
              <td>{recipe[0].strMeasure2}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient3}</td>
              <td>{recipe[0].strMeasure3}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient4}</td>
              <td>{recipe[0].strMeasure4}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient5}</td>
              <td>{recipe[0].strMeasure5}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient6}</td>
              <td>{recipe[0].strMeasure6}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient7}</td>
              <td>{recipe[0].strMeasure7}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient8}</td>
              <td>{recipe[0].strMeasure8}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient9}</td>
              <td>{recipe[0].strMeasure9}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient10}</td>
              <td>{recipe[0].strMeasure10}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient11}</td>
              <td>{recipe[0].strMeasure11}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient12}</td>
              <td>{recipe[0].strMeasure12}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient13}</td>
              <td>{recipe[0].strMeasure13}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient14}</td>
              <td>{recipe[0].strMeasure14}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient15}</td>
              <td>{recipe[0].strMeasure15}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient16}</td>
              <td>{recipe[0].strMeasure16}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient17}</td>
              <td>{recipe[0].strMeasure17}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient18}</td>
              <td>{recipe[0].strMeasure18}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient19}</td>
              <td>{recipe[0].strMeasure19}</td>
            </tr>
            <tr>
              <td>{recipe[0].strIngredient20}</td>
              <td>{recipe[0].strMeasure20}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="div4">
        <h2>Recipe :</h2>
        <p>{recipe[0].strInstructions}</p>
      </div>
    </div>
  );
}
