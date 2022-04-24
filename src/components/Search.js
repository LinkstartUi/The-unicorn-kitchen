import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function Search() {
  const value = useLocation();
  const currentValue = value.state.currentTarget;
  console.log(currentValue);
  const [search, setSearch] = useState("");
  const urlSearch =
    "https://www.themealdb.com/api/json/v1/1/search.php?key=1&f=" +
    currentValue;
  useEffect(() => {
    axios.get(urlSearch).then((response) => {
      console.log(response);
      setSearch(response.data.meals);
    });
  }, [urlSearch, value]);
  if (!search) return null;
  const myList = [];
  myList.push(search);
  return (
    <div>
      <h1>Recettes</h1>
      <h3>
        Voici la recherche à partir de la lettre : <span>{currentValue}</span>
      </h3>
      <div>
        {myList &&
          myList[0].map((search, i) => (
            <div key={i}>
              <img src={search.strMealThumb} height="100" />
              <span style={{ display: "block" }}>{search.strMeal}</span>
              <Link
                to={`/recettes/${search.idMeal}`}
                state={{ id: search.idMeal }}
              >
                <button>Voir la recette</button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
