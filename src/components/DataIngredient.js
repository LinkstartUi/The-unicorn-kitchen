import React, { useState, useEffect } from "react";
import Ingredient from "./Ingredient";

const axios = require("axios").default;
const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list&key=1";

export default function DataIngredient() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, []);
  if (!data) return null;
  const dataEx = data.meals;
  const myList = [];
  dataEx.forEach((element) => {
    myList.push(element.strIngredient);
  });

  return (
    <>
      <Ingredient data={myList} />
    </>
  );
}
