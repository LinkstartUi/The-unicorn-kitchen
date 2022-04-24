import React from "react";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import "./Category.css";

export default class TicTacList extends React.Component {
  state = {
    djamel: [],
  };

  componentDidMount() {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/categories.php?key=1`)
      .then((res) => {
        const djamel = res.data.categories;
        console.log(res);
        this.setState({ djamel });
      });
  }

  render() {
    return (
      <ImageList sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          <ImageListItem key="Subheader">
            <ListSubheader component="div">Categories</ListSubheader>
          </ImageListItem>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100vh",
            flexWrap: "wrap",
          }}
        >
          {this.state.djamel.map((item, i) => (
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
          ))}
        </Box>
      </ImageList>
    );
  }
}
