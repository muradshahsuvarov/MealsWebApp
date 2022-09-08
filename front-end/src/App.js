import './App.css';
import React from 'react';
import { useState, useEffect } from 'react'
import SearchButtonComponent from './components/SearchButtonComponent/SearchButtonComponent';
import NavBar from './components/NavBar/NavBar';
import RecipeReviewCard from './components/RecipeReviewCard/RecipeReviewCard'



function App() {

  const [state, setState] = useState({ data: null, input_name: null, image_url: null })

  function handleState(stateValue, inputName, imageUrl) {
    if (JSON.parse(stateValue).message != null) {
      setState({ data: null, input_name: null, image_url: null})
      return;
    }
    setState({ data: stateValue, input_name: inputName, image_url: imageUrl })
  }

   return (
      <div className="App">
        <header className="App-header">
          {
            state.data ? ( <div><RecipeReviewCard data={state.data} input_name={state.input_name} image_url={state.image_url} /></div> ) : JSON.parse(state.data) == null ?  ( null ) : ( null )
          }       
          <img src="/pizzaicon2.png" className="App-logo" alt="logo" />
          <SearchButtonComponent handleState={handleState} />
        </header>
      </div>
    );
}


export default App;
