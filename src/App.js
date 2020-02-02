import React, { useState } from 'react';
import LandingPage from "./screens/landing";
import Playground from "./screens/playground";
import './App.css';

function App() {

  let [isPlaying, setIsPlaying] = useState(false);

  const playButtonPressed = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="App">
      {
        isPlaying ? <Playground /> : <LandingPage play={playButtonPressed} />
      }
    </div>
  );
}

export default App;
