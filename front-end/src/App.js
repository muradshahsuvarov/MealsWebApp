import './App.css';
import React from 'react';
import { useState, useEffect } from 'react'
import SearchButtonComponent from './components/SearchButtonComponent/SearchButtonComponent';




function App() {

  const [state, setState] = useState({ message: null })

  useEffect(() => {

    async function fetchData() {

      const data = await fetch('http://localhost:5000/', { method: "GET"});
      const json = await data.text()
      const json_message = JSON.parse(json).message
  
      setState({ message: json_message })
    }

    fetchData();

  }, []); // [] - is a dependency array, if it's provided and empty, react will run useEffect once the component is mounted to DOM

   return (
      <div className="App">
        <header className="App-header">
          <img src="/pizzaicon2.png" className="App-logo" alt="logo" />
          <SearchButtonComponent />
        </header>
      </div>
    );
}


export default App;
