import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Posts from "./Posts"
  
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Posts />
      </header>
    </div>
  );
}

export default App;
