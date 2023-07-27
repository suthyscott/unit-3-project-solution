import React, { useState } from "react";
import styles from "./NewRecipe.module.css";
// Import the Formik Component from formik
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const NewRecipeScreen = () => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("");
  const url = "https://recipes.devmountain.com";
  const navigate = useNavigate()

  const addIngredient = () => {
    setIngredients([...ingredients, { name, quantity }]);
    setName("");
    setQuantity("");
  };

  // These are the intial values for Formik, they lay out a blueprint for all the data that formik will need to track through various inputs. 
  const initialValues = {
    type: "",
    recipeName: "",
    imageURL: "",
    prepTime: "",
    cookTime: "",
    serves: "",
    ingredients: [],
    instructions: "",
  };

  // the onSubmit function is invoked by Formik and the values object that Formik used to track all the user input is passed in as a argument, which we receive as the values parameter.
  const onSubmit = (values) => {
    // We take the ingredients array from state and add it into the Formik values object, which then becomes our body for the post request. 
    values.ingredients = ingredients;
    console.log(values);
  // };
    axios
      .post(`https://recipes.devmountain.com/recipes`, values)
      .then((res) => {
        console.log(res.data);
        navigate(`/recipe/${res.data[0][0].recipe_id}`)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ingredientDisplay = ingredients.map((ing) => {
    return (
      <li>
        {ing.quantity} {ing.name}
      </li>
    );
  });

  return (
    <section>
      <h1>Tell us about your Recipe!</h1>
      {/* Render the Formik component and pass in some props. initialValues tells Formik what values we're going to track, by specifying what all needs to be in our values object. onSubmit is the function we want to run when the form gets submitted.*/}
      <Formik initialValues={initialValues} onSubmit={(values, {resetForm}) => {
        onSubmit(values)
        resetForm()
      }}>
        {/* Inside the Formik component we render an arrow. Whatever is returned from inside the arrow function will be renderd on the page. The arrow function takes in and immediately desctructures three parameters: values is a dynamic object that has all the properties from our initial values object, and we'll be updating those properties as the user types in the input. handleChange updates those properties in the values objects based on the name of the input and value. handleSubmit triggers the onSubmit that we provided above.*/}
        {({ values, handleChange, handleSubmit}) => {
          console.log(values)
          return(
        
          <form onSubmit={handleSubmit}>
            <div className={styles.input_container}>
              {/* each input needs to have a name that corresponds with a property in our initialValues and values objects. As long as the name matches, the handleChange function with take the value the use types and update the corresponding property in the values object to match. The input also has to have a value attribute that also corresponds with the right values property so that the input and the property stay in sync with the same value. */}
              <input
                placeholder="Title your Recipe!"
                value={values.recipeName}
                onChange={handleChange}
                name="recipeName"
              />
              <input
                placeholder="Paste an Image URL"
                value={values.imageURL}
                onChange={handleChange}
                name="imageURL"
              />
            </div>
            <div className={styles.radio_container}>
              <span>
                <input
                  type="radio"
                  value="Cook"
                  onChange={handleChange}
                  name="type"
                />
                <h5>Cook</h5>
              </span>
              <span>
                <input
                  type="radio"
                  value="Bake"
                  onChange={handleChange}
                  name="type"
                />
                <h5>Bake</h5>
              </span>
              <span>
                <input
                  type="radio"
                  value="Drink"
                  onChange={handleChange}
                  name="type"
                />
                <h5>Drink</h5>
              </span>
            </div>
            <div className={styles.input_container}>
              <input
                placeholder="Prep Time"
                value={values.prepTime}
                onChange={handleChange}
                name="prepTime"
              />
              <input
                placeholder="Cook Time"
                value={values.cookTime}
                onChange={handleChange}
                name="cookTime"
              />
              <input
                placeholder="Serves"
                value={values.serves}
                onChange={handleChange}
                name="serves"
              />
            </div>
            <h3>Ingredients</h3>
            <div className={styles.input_container}>
              <div className={styles.ingredient_inputs}>
                <input
                  placeholder="Ingredient"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <ul>{ingredientDisplay}</ul>
            </div>
            <button
              type="button"
              className="orange-btn"
              onClick={addIngredient}
            >
              Add Another
            </button>
            <textarea
              placeholder="Type your instructions"
              rows={5}
              value={values.instructions}
              onChange={handleChange}
              name="instructions"
            />
            {/* Button triggers a submit event, which is handled in the onSubmit form event on line 66 */}
            <button type="submit" className="blue-btn">
              Submit
            </button>
          </form>
        )}}
      </Formik>
    </section>
  );
};

export default NewRecipeScreen;

