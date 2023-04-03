import React from 'react'
import { useEffect, useState } from 'react'
import Recipe from '../components/Recipe';
import RecipeList from '../components/RecipeList'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home( {loggedIn, handleLogin, handleLogout, user} ) {

  // Store the fetched recipes
  const [recipes, setRecipes] = useState([]);

  // Keep track of if the view button is set or not
  const [showComponent, setShowComponent] = useState(false);

  // Keep track of the selected recipe
  const [selectedRecipe, setSelectedRecipe] = useState([]);



  // Conditionally Render the Recipe List or a specific Recipe
  const showComponentHandler = (recipe) => {
    setShowComponent(!showComponent);
    console.log(showComponent);
    setSelectedRecipe(recipe);
  };

  // Enable Back Button
  const toggleShowComponent = () => {
    setShowComponent(!showComponent);
  };


  // Fetch the recipes
  // useEffect(() => {
  //   fetch("http://localhost:3000/recipes")
  //     .then (r => r.json())
  //     .then(data => setRecipes(data))
  // }, []);

  
  useEffect(() => {
    // Keep user Logged in
    fetch("http://localhost:3000/me")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            handleLogin(user)
          });
        }
      })
      .catch((error) => {
        console.log("Error fetching user data: ", error);
      });

      // Fetch the Recipes
      fetch("http://localhost:3000/recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.log("Error fetching recipes: ", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      {showComponent ? <Recipe recipe={selectedRecipe} toggleShowComponent={toggleShowComponent} /> : <RecipeList recipes={recipes} showComponentHandler={showComponentHandler} showComponent={showComponent} loggedIn={loggedIn} handleLogout={handleLogout} />}
      <Footer />
    </>
  )
}

export default Home