import logo from './assets/logo.jpg';
import './App.css';
import Keyboard from './components/Keyboard'
import Panel from './components/Panel'
import GuessContext from './context'
import { useState } from 'react';


function App() {

  const [ placeholder, updatePlaceholder ] = useState([])
  const [ currentGuess, updateCurrentGuess ] = useState([])
  const [ guesses, updateGuesses ] = useState([])

  return (
    <GuessContext.Provider 
      value={{ 
        placeholder: placeholder, 
        updatePlaceholder: updatePlaceholder,
        currentGuess: currentGuess, 
        updateCurrentGuess: updateCurrentGuess,
        guesses: guesses,
        updateGuesses: updateGuesses
      }}
    >
      <div className="App">
        <img src={logo} /> 
        <Panel />
        <Keyboard />
      </div>
    </GuessContext.Provider>
  );
}

export default App;
