import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const axios = require("axios").default;
export default function CategoryMeals() {
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php?key=1";
  const [data, setData] = useState("");
  useEffect(() => {
    axios.get(url).then((response) => {
      const dataEx = response.data.categories;
      setData(dataEx);
    });
  }, []);

  if (!data) return null;
  const myList = [];
  myList.push(data);

  return (
    <ImageList sx={{ display: "flex", flexDirection: "column" }}>
      <Box>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Categories</ListSubheader>
        </ImageListItem>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {myList[0].map((item, i) => {
          const category =
            (item.strCategory != item.strCategory) != "Breakfast" &&
            item.strCategory != "Starter" &&
            item.strCategory != "Dessert" &&
            item.strCategory != "Miscellaneous" ? (
              <ImageListItem key={i}>
                <img
                  src={`${item.strCategoryThumb}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.strCategoryThumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.strCategory}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.strCategory}
                  actionIcon={
                    <Link
                      to={`/category/${item.strCategory}`}
                      state={{ id: item.strCategory }}
                    >
                      <button>Voir</button>
                    </Link>
                  }
                />
              </ImageListItem>
            ) : (
              ""
            );
          return category;
        })}
      </Box>
    </ImageList>
  );
}
