import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import "./Navbar.css";
import Logo from "../logo.png";
import Croix from "../croix.png";
import { Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  // ------------------------------MENU PRINCIPAL ----------------
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open = Boolean(anchorEl1);
  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl1(null);
  };
  // ------------------------------MENU SECONDAIRE ----------------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div className="containerMenu2">
        <div>
          <button className="btn-retour1" onClick={handleMenuClose}>
            <img src={Croix} alt="icone fermeture" />
          </button>
        </div>
        <div className="itemsMenu2">
          <Link to="/connexion">
            <MenuItem onClick={handleMenuClose}>Connexion</MenuItem>
          </Link>
          <Link to="/inscription">
            <MenuItem onClick={handleMenuClose}>Inscription</MenuItem>
          </Link>
        </div>
      </div>
      <div className="containerMenu3">
        <div>
          <button className="btn-retour1" onClick={handleMenuClose}>
            <img src={Croix} alt="icone fermeture" />
          </button>
        </div>
        <div className="itemsMenu2">
          <Link to="/user">
            <MenuItem onClick={handleMenuClose}>Mon compte</MenuItem>
          </Link>
          <Link to="/favoris">
            <MenuItem onClick={handleMenuClose}>Favoris</MenuItem>
          </Link>
          <Link to="/favoris">
            <MenuItem onClick={handleMenuClose}>Créer une recette</MenuItem>
          </Link>
        </div>
      </div>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    let search = e.target.value;
    setValue(search);
  };

  const [value1, setValue1] = useState("");

  const handleSearch2 = (e) => {
    let search = e.target.value;
    setValue1(search);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="header">
          <Box
            className="headerTop"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, padding: 3 }}
            >
              <MenuIcon
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                className="btn-menu"
                onClick={(e) => handleClick(e)}
              />

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <div className="containerMenu">
                  <div className="containerCross">
                    <img
                      src={Croix}
                      onClick={handleClose}
                      className="btn-retour"
                      alt="icone fermeture"
                    />
                  </div>
                  <div className="menu-items">
                    <a href="/">
                      <MenuItem onClick={handleClose}>Accueil</MenuItem>
                    </a>
                    <Link to="/category">
                      <MenuItem onClick={handleClose}>Categories</MenuItem>
                    </Link>
                    <Link to="/pays">
                      <MenuItem onClick={handleClose}>Pays</MenuItem>
                    </Link>
                    <Link to="/ingredient">
                      <MenuItem onClick={handleClose}>Ingredients</MenuItem>
                    </Link>
                    <Link to="/recettes">
                      <MenuItem onClick={handleClose}>Recettes</MenuItem>
                    </Link>
                  </div>
                </div>
              </Menu>
            </IconButton>
            <img src={Logo} className={"logo"} alt="Logo" />
            <Search className="search">
              <SearchIconWrapper>
                <SearchIcon className="searchIco" />
              </SearchIconWrapper>
              <Link to="/search" state={{ currentTarget: value }}>
                <form>
                  <StyledInputBase
                    placeholder="Search with the first letter of recipe"
                    inputProps={{ "aria-label": "search" }}
                    className="searchstyle"
                    onChange={handleSearch}
                  />
                  <input
                    className="search-btn"
                    type="submit"
                    name="search"
                    value="search"
                  />
                </form>
              </Link>
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <Search className="search1">
              <SearchIconWrapper>
                <SearchIcon className="searchIco1" />
              </SearchIconWrapper>
              <Link to="/search" state={{ currentTarget: value1 }}>
                <form>
                  <StyledInputBase
                    placeholder="Search with the first letter of recipe"
                    inputProps={{ "aria-label": "search" }}
                    className="searchstyle1"
                    onChange={handleSearch2}
                  />
                  <input
                    className="search-btn1"
                    type="submit"
                    name="search"
                    value="search"
                  />
                </form>
              </Link>
            </Search>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
