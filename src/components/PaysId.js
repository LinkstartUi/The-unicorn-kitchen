import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function PaysId(props) {
  const [pays, setPays] = useState("");
  const city = props.city;
  useEffect(() => {
    axios
      .get(
        "https://www.themealdb.com/api/json/v1/1/filter.php?a=" +
          city +
          "&key=1"
      )
      .then((res) => {
        const linkstart = res.data.meals;
        setPays(linkstart);
      });
  }, [city]);
  if (!pays) return null;
  const myList = [];
  myList.push(pays);

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
                    <Link
                      to={`/recettes/${item.idMeal}`}
                      state={{ id: item.idMeal }}
                    >
                      <button>Voir</button>
                    </Link>
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
