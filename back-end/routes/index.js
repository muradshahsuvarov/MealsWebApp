const express = require('express');
const router = express.Router();
const axios = require('axios');
const circularJson = require('circular-json');
const { response } = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.json( { message: 'Welcome to Meals Data Service by Murad Shahsuvarov' })
});

router.get('/meals/areas/:area', (req, res, next) => {

  const area = req.params.area;

  const options = {
    method: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  }

  axios.request(options).then((response) => {

    const serialized = circularJson.stringify(response);
    const deserialized = circularJson.parse(serialized);

    const meals = deserialized.data.meals;

    if (!meals) {
      return res.status(404).send(`Ingredient ${ingredient} not found`)
    } 

    res.status(200).send(meals)
  }).catch((error) => {
    if (error) {
      console.log(error)
    } 
  })

});

router.get('/meals/ingredients/filterbyingredient/:ingredient', (req, res, next) => {

  const ingredient = req.params.ingredient;

  const options = {
    method: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  }

  axios.request(options).then((response) => {

    const serialized = circularJson.stringify(response);
    const deserialized = circularJson.parse(serialized);

    const meals = deserialized.data.meals;

    if (!meals) {
      return res.status(404).send(`Ingredient ${ingredient} not found`)
    } 

    res.status(200).send(meals)
  }).catch((error) => {
    if (error) {
      console.log(error)
    } 
  })

});

router.get('/meals/ingredients', (req, res, next) => {
  
  const options = {
    method: "GET",
    url: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
  }

  axios.request(options).then((response) => { 
    
    const serialized = circularJson.stringify(response); // response is circular js object, that's why we do this
    const deserialized = circularJson.parse(serialized);

    const areas = deserialized.data.meals;

    if (!areas) {
      return res.status(404).send('Categories not found')
    }

    
    res.status(200).json(areas);
  });

})

router.get('/meals/areas', (req, res, next) => {
  
  const options = {
    method: "GET",
    url: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
  }

  axios.request(options).then((response) => { 
    
    const serialized = circularJson.stringify(response); // response is circular js object, that's why we do this
    const deserialized = circularJson.parse(serialized);

    const areas = deserialized.data.meals;

    if (!areas) {
      return res.status(404).send('Categories not found')
    }

    
    res.status(200).json(areas);
  });

})

router.get('/meals/categories', (req, res, next) => {
  
  const options = {
    method: "GET",
    url: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
  }

  axios.request(options).then((response) => { 
    
    const serialized = circularJson.stringify(response); // response is circular js object, that's why we do this
    const deserialized = circularJson.parse(serialized);

    const categories = deserialized.data.meals;

    if (!categories) {
      return res.status(404).send('Categories not found')
    }

    
    res.status(200).json(categories);
  });

})

router.get('/meals/categories/:category', (req, res, next) => { 

  const category = req.params.category

  const options = {
    method: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  }


  axios.request(options).then((response) => {
    
    const serialized = circularJson.stringify(response);
    const deserialized = circularJson.parse(serialized);

    const meals = deserialized.data.meals;

    if (!meals) {
      return res.status(404).send(`Meals based on ${category} category not found.`)
    }

    res.status(200).send(meals)
  })
})

router.get('/meals/random', (req, res, next) => {

  const options = {
    method: "GET",
    url: "https://www.themealdb.com/api/json/v1/1/random.php"
  }

  axios.request(options).then((response) => {
    
    const serialized = circularJson.stringify(response);
    const deserialized = circularJson.parse(serialized);

    const meals = deserialized.data.meals;
    
    if (!meals) {
      return res.status(404).json({
       message: 'Meal not found' 
      });
    }

    res.status(200).send(meals[0]);
  })

});

router.get('/meals/firstletter/:firstletter', (req, res, next) => {

  const firstLetter = req.params.firstletter;

  const options = {
    method: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
  }

  axios.request(options).then((response) => {

    const serialized = circularJson.stringify(response);
    const deserialized = circularJson.parse(serialized);

    const meals = deserialized.data.meals;

    if (!meals) {
    return res.status(404).json({
      message: 'Meals not found'
    })
    }

    meals.map(meal => console.log(meal.strMeal))
    res.status(200).send(meals)
  });
  
});


router.get('/meals/:name', (req, res, next) => {

  const options = {
    method: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${req.params.name}`
  }
  
   axios.request(options).then(function (response) {

    const serialized_response = circularJson.stringify(response)
    const deserialized_response = circularJson.parse(serialized_response);

    if (!deserialized_response.data.meals) {
      return res.status(404).json( {
        message: `Meal named ${req.params.name} not found.`
      }
      );
    }

    const meal_full_name = deserialized_response.data.meals[0].strMeal;
    const meal_origin = deserialized_response.data.meals[0].strArea;
    const meal_recipe = deserialized_response.data.meals[0].strInstructions;

    res.status(200).json( { name: meal_full_name, origin: meal_origin, recipe: meal_recipe} )
  }).catch(function (error) {
    console.error(error);
  });
  
});


module.exports = router;