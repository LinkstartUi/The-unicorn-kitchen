import React, { useState, useEffect } from "react";
import RecetteId from "./RecetteId";
import { Link } from "react-router-dom";
// import "./ListeRecettes.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const axios = require("axios").default;
const url_recette = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="; //recette id
const url_categorie = "https://www.themealdb.com/api/json/v1/1/filter.php?c="; // 'strMeal' + "key=1" //recette
const url_list_categories =
  "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

export default function Recette() {
  const [listRecipe, setlistRecipe] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategories, setselectedCategories] = useState(null);
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    axios.get(url_list_categories).then((response) => {
      setCategories(response.data.meals);
    });
  }, []);

  const handleChange = (event) => {
    setselectedCategories(event.target.value);
  };

  useEffect(() => {
    axios.get(url_categorie + selectedCategories).then((response) => {
      setlistRecipe(response.data.meals);
    });
  }, [selectedCategories]);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategories}
          label="Categories"
          onChange={handleChange}
        >
          {categories &&
            categories.map((categorie) => (
              <MenuItem value={categorie.strCategory}>
                {categorie.strCategory}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <div>
        {listRecipe &&
          listRecipe.map((recipes, i) => (
            <div key={i}>
              <img src={recipes.strMealThumb} height="100" />
              <span style={{ display: "block" }}>{recipes.strMeal}</span>
              <Link
                to={`/recettes/${recipes.idMeal}`}
                state={{ id: recipes.idMeal }}
              >
                <button>Voir</button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
