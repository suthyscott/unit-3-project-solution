import React, {useEffect, useState} from 'react'
import AdBanner from './AdBanner'
import RecipeContainer from './RecipeContainer'
import axios from 'axios'

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([])
  
  // save data so that the user can interact with it as they're using the site
  const url = 'https://recipes.devmountain.com'

  const getRecipes = () => {
    axios
      .get(`${url}/recipes`)
      .then((res) => {
        setRecipes(res.data)
        console.log(res.data)
      })
  }

  useEffect(() => {getRecipes()},[])
  
  return (
    <div>
      <AdBanner />
      <RecipeContainer recipes={recipes}/>
    </div>
  )
}

export default HomeScreen