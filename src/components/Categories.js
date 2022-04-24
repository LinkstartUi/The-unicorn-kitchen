import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import "./Categories.css";

const axios = require("axios").default;
const url = "https://www.themealdb.com/api/json/v1/1/categories.php?key=1";
const urlRepas = "https://i.ibb.co/Ct5m55p/repas.jpg";

export default function Categories() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, []);
  if (!data) return null;
  const dataEx = data.categories;
  return (
    <ImageList
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <ImageListItem className="categoriesParent">
          <img
            src={`${dataEx[12].strCategoryThumb}?w=248&fit=crop&auto=format`}
            srcSet={`${dataEx[12].strCategoryThumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={dataEx[12].strCategory}
            loading="lazy"
            sx={{ width: "none" }}
          />
          <ImageListItemBar
            title={dataEx[12].strCategory}
            actionIcon={
              <Link
                to={`/category/${dataEx[12].strCategory}`}
                state={{ id: dataEx[12].strCategory }}
              >
                <button>Voir</button>
              </Link>
            }
          />
        </ImageListItem>
        <ImageListItem className="categoriesParent">
          <img
            src={`${dataEx[9].strCategoryThumb}?w=248&fit=crop&auto=format`}
            srcSet={`${dataEx[9].strCategoryThumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={dataEx[9].strCategory}
            loading="lazy"
          />
          <ImageListItemBar
            title={dataEx[9].strCategory}
            actionIcon={
              <Link
                to={`/category/${dataEx[9].strCategory}`}
                state={{ id: dataEx[9].strCategory }}
              >
                <button>Voir</button>
              </Link>
            }
          />
        </ImageListItem>
        <ImageListItem className="categoriesParent">
          <img
            src={`${urlRepas}?w=248&fit=crop&auto=format`}
            srcSet={`${urlRepas}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt="Meals"
            loading="lazy"
          />
          <ImageListItemBar
            title="Meals"
            actionIcon={
              <Link to="/categorymeals">
                <button>Voir</button>
              </Link>
            }
          />
        </ImageListItem>
        <ImageListItem className="categoriesParent">
          <img
            src={`${dataEx[2].strCategoryThumb}?w=248&fit=crop&auto=format`}
            srcSet={`${dataEx[2].strCategoryThumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={dataEx[2].strCategory}
            loading="lazy"
          />
          <ImageListItemBar
            title={dataEx[2].strCategory}
            actionIcon={
              <Link
                to={`/category/${dataEx[2].strCategory}`}
                state={{ id: dataEx[2].strCategory }}
              >
                <button>Voir</button>
              </Link>
            }
          />
        </ImageListItem>
        <ImageListItem className="categoriesParent">
          <img
            src={`${dataEx[4].strCategoryThumb}?w=248&fit=crop&auto=format`}
            srcSet={`${dataEx[4].strCategoryThumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={dataEx[4].strCategory}
            loading="lazy"
          />
          <ImageListItemBar
            title={dataEx[4].strCategory}
            actionIcon={
              <Link
                to={`/category/${dataEx[4].strCategory}`}
                state={{ id: dataEx[4].strCategory }}
              >
                <button>Voir</button>
              </Link>
            }
          />
        </ImageListItem>
      </Box>
      <Box>
        <Link to="/category">
          <Button variant="contained" disableElevation>
            Voir les categories
          </Button>
        </Link>
      </Box>
    </ImageList>
  );
}
