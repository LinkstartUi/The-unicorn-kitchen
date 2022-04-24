import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Link } from "react-router-dom";
import "./Carrousel.css";

const axios = require("axios").default; 
// Import axios to make the request to the API ( https://www.food2fork.com/api/search )  
// axios is available in the src folder  
// https://www.npmjs.com/package/axios 
// https://www.npmjs.com/package/react-swipeable-views package to make the carrousel   


const AutoPlaySwipeableViews = autoPlay(SwipeableViews); // Import SwipeableViews component from react-swipeable-views package and set it to AutoPlaySwipeableViews variable to use it in Carrousel component below for auto play carrousel function 
const url1 = "https://www.themealdb.com/api/json/v1/1/random.php?key=1";
const url2 = "https://www.themealdb.com/api/json/v1/1/random.php?key=1";
const url3 = "https://www.themealdb.com/api/json/v1/1/random.php?key=1";
const url4 = "https://www.themealdb.com/api/json/v1/1/random.php?key=1";

function SwipeableTextMobileStepper() {
  const theme = useTheme(); // Get the theme from the context
  const [activeStep, setActiveStep] = React.useState(0); // Set the active step

  //   Data extraction
  
  
  const [data, setData] = useState(null);  // Data is the state of the data

  useEffect(() => { // useEffect is a hook that runs after the component is rendered
    axios // axios is a library that allows us to make requests to the API
      .all([axios.get(url1), axios.get(url2), axios.get(url3), axios.get(url4)]) // axios.all is a method that allows us to make multiple requests at the same time
      .then((firstResponse) => { // firstResponse is an array of the responses
        setData(firstResponse); // setData is a method that allows us to set the state of the data
      });
  }, []);

  if (!data) return null; // If data is not loaded yet, return null

  const dataEx1 = data[0].data.meals[0]; // data is loaded, so we can access the data and extract the first meal of the first response (the first response is the first meal of the API)  dataEx1 is the first meal of the first response is the first meal of the API  
  const dataEx2 = data[1].data.meals[0];
  const dataEx3 = data[2].data.meals[0];
  const dataEx4 = data[3].data.meals[0];

  const images = [
    {
      label: dataEx1.strMeal, // label is the name of the meal
      imgPath: dataEx1.strMealThumb, // imgPath is the path to the image
      id: dataEx1.idMeal, // id is the id of the meal
    },
    {
      label: dataEx2.strMeal,
      imgPath: dataEx2.strMealThumb,
      id: dataEx2.idMeal,
    },
    {
      label: dataEx3.strMeal,
      imgPath: dataEx3.strMealThumb,
      id: dataEx3.idMeal,
    },
    {
      label: dataEx4.strMeal,
      imgPath: dataEx4.strMealThumb,
      id: dataEx4.idMeal,
    },
  ];

  const maxSteps = images.length;

  const handleNext = () => { // handleNext is a method that allows us to go to the next step
    setActiveStep((prevActiveStep) => prevActiveStep + 1); // setActiveStep is a method that allows us to set the state of the activeStep
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1, paddingTop: 1, margin: 0 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography>{images[activeStep].label}</Typography> 
        {/* // Typography is a component that allows us to display text  */}
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"} // axis is a property that allows us to set the direction of the carrousel (rtl is right to left)  (x-reverse is the opposite direction)   (x is the direction of the carrousel)
        index={activeStep} // index is a property that allows us to set the active step
        onChangeIndex={handleStepChange} // onChangeIndex is a property that allows us to set the state of the activeStep when we change the step of the carrousel (handleStepChange is the method that allows us to set the state of the activeStep)   
        enableMouseEvents // enableMouseEvents is a property that allows us to enable the mouse events on the carrousel (it allows us to swipe the carrousel) 
      >
        {images.map((step, index) => ( // images is an array of objects with the properties label, imgPath and id
        // step is an object with the properties label, imgPath and id mapped to the properties of the object in the array images   index is the index of the object in the array images   
        // handleStepchange is a method that allows us to go to the next step 
          <Link to={`/recettes/${step.id}`} state={{ id: step.id }}> 
          {/* // Link is a react component that allows us to link to another page   */}  
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? ( // Math.abs is a method that returns the absolute value of a number (the value of the number)
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: "block",
                    maxWidth: 400,
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          </Link>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps} // max steps is the number of steps in the carrousel step is the current step of the carrousel  
        position="static" // position is a property that allows us to set the position of the stepper (static, bottom, top) 
        activeStep={activeStep} // activeStep is a property that allows us to set the active step
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1} // disabled is a property that allows us to disable a button (true or false)  activeStep is a property that allows us to set the active step  maxSteps is a property that allows us to set the maximum number of steps
          >
            Next
            {theme.direction === "rtl" ? ( // theme.direction is a property that allows us to set the direction of the theme (ltr or rtl)  rtl is right to left ltr is left to right  if theme.direction is rtl, then return the following  if theme.direction is ltr, then return the following   
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
         <Button size="small" onClick={handleBack} disabled={activeStep === 0}> 
         {/* // disabled is a property that allows us to disable a button (true or false)  activeStep is a property that allows us to set the active step  maxSteps is a property that allows us to set the maximum number of steps */}
            {theme.direction === "rtl" ? ( // theme is a property that allows us to set the direction of the theme (ltr or rtl)  rtl is right to left ltr is left to right  if theme.direction is rtl, then return the following  if theme.direction is ltr, then return the following
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper; // SwipeableTextMobileStepper is a component that allows us to create a stepper // export default SwipeableTextMobileStepper is a method that allows us to export the component
