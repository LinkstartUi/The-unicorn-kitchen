import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import axios from "axios";

export default function CategoryId() {
  const value = useLocation();
  const currentValue = value.state.id;
  const [search, setSearch] = useState("");
  const urlSearch =
    "https://www.themealdb.com/api/json/v1/1/filter.php?key=1&c=" +
    currentValue;
  useEffect(() => {
    axios.get(urlSearch).then((response) => {
      setSearch(response.data.meals);
    });
  }, [urlSearch, value]);
  if (!search) return null;
  const myList = [];
  myList.push(search);
  return (
    <ImageList className>
      <ImageListItem key="Subheader" cols={8}>
        <ListSubheader component="div">
          Nos reccettes de la categorie : <span>{currentValue}</span>
        </ListSubheader>
      </ImageListItem>
      {myList[0].map((item, i) => (
        <ImageListItem key={i}>
          <img
            src={`${item.strMealThumb}?w=248&fit=crop&auto=format`}
            srcSet={`${item.strMealThumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.strMeal}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.strMeal}
            actionIcon={
              <Link to={`/recettes/${item.idMeal}`} state={{ id: item.idMeal }}>
                <button>Voir la recette</button>
              </Link>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
