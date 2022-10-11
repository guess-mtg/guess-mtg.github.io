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

  const handleGuessUpdate = (letter, clear = false ) => {

    let newGuess 
    
    if (clear) {
      newGuess = []
    }
    else if (letter) {
      newGuess = currentGuess.concat(letter)
      console.log(placeholder[currentGuess.length])
      if (!placeholder[currentGuess.length+1]) {
        newGuess = newGuess.concat(' ')
      }
    }
    else {
      newGuess = currentGuess.slice(0, currentGuess.length - 1)
      if (!placeholder[newGuess.length - 1]) {
        newGuess = newGuess.slice(0, newGuess.length - 1)
      }
    }

    console.log(newGuess)

    updateCurrentGuess(newGuess)
  }

  return (
    <GuessContext.Provider 
      value={{ 
        placeholder: placeholder, 
        updatePlaceholder: updatePlaceholder,
        currentGuess: currentGuess, 
        updateCurrentGuess: handleGuessUpdate,
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
