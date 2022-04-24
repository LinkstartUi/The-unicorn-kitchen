// import React from "react";

// // export default function AddRecette() {
// //   return <p>test</p>;
// // }
// import {Link} from "react-router-dom";
// import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
// import ImageListItemBar from "@mui/material/ImageListItemBar";
// import ListSubheader from "@mui/material/ListSubheader";
// import Box from "@mui/material/Box";

// export default function AddRecette() {
//   return (
//     <div>
//       <Box sx={{}}>
//         <ImageList sx={{ display: "flex", flexDirection: "column" }}>
//           <Box>
//             <ImageListItem key="Subheader">
//               <ListSubheader component="div">Recettes</ListSubheader>
//             </ImageListItem>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               flexWrap: "wrap",
//             }}
//           >
//             {myList[0].map((item) => (
//               <ImageListItem key={item.idMeal}>
//                 <img
//                   src={`${item.strMealThumb}?w=248&fit=crop&auto=format`}
//                   srcSet={`${item.strMealThumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
//                   alt={item.strMeal}
//                   loading="lazy"
//                 />
//                 <ImageListItemBar
//                   title={item.strMeal}
//                   actionIcon={
//                     <Link
//                       to={`/recettes/${recipes.idMeal}`}
//                       state={{ id: recipes.idMeal }}
//                     >
//                       <button>Voir</button>
//                     </Link>
//                   }
//                 />
//               </ImageListItem>
//             ))}
//           </Box>
//         </ImageList>
//       </Box>
//     </div>
//   );
// }