import { Routes, Route } from "react-router-dom";
import Category from "./Category";
import Pays from "./Pays";
import DataIngredient from "./DataIngredient";
import Recette from "./Recette";
import Acceuil from "./Acceuil";
import RecetteId from "./RecetteId";
import CategoryId from "./CategoryId";
import CategoryMeals from "./CategoryMeals";
import Connexion from "./Connexion";
import Inscriptions from "./Inscriptions";
import User from "./User";
import Favoris from "./Favoris";
import AddRecette from "./AddRecette";
import Search from "./Search";

export default function RouterURLM1() {
  return (
    <Routes>
      <Route path="/" element={<Acceuil />} />
      <Route path="/category" element={<Category />} />
      <Route path="/category/:categoryid" element={<CategoryId />} />
      <Route path="/categorymeals" element={<CategoryMeals />} />
      <Route path="/pays" element={<Pays />} />
      <Route path="/ingredient" element={<DataIngredient />} />
      <Route path="/recettes" element={<Recette />} />
      <Route path="/recettes/:id" element={<RecetteId />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscriptions />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/favoris" element={<Favoris />} />
      <Route path="/ajoutrecette" element={<AddRecette />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}
