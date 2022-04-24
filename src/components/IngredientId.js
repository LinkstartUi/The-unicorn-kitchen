import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";

const axios = require("axios").default;

export default function IngredientId(props) {
  const urlIngredient =
    "https://www.themealdb.com/api/json/v1/1/filter.php?i=" +
    props.id +
    "&key=1";
  const [data2, setData2] = useState(null);
  useEffect(() => {
    axios.get(urlIngredient).then((response) => {
      setData2(response.data);
    });
  }, []);
  if (!data2) return null;
  const dataEx2 = data2.meals;
  const myList = [];
  myList.push(dataEx2);

  return (
    <Box sx={{}}>
      <ImageList sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          <ImageListItem key="Subheader">
            <ListSubheader component="div">Recettes</ListSubheader>
          </ImageListItem>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {myList[0].map((item) => (
            <ImageListItem key={item.idMeal}>
              <img
                src={`${item.strMealThumb}?w=248&fit=crop&auto=format`}
                srcSet={`${item.strMealThumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.strMeal}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.strMeal}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.strMeal}`}
                  >
                    <button>Voir</button>
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </Box>
      </ImageList>
    </Box>
  );
}
