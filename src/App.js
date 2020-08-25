import React, { useState } from 'react';
import {Playground, LandingPage} from "./screens";
import './App.css';

function App() {

  const [isPlaying, setIsPlaying] = useState(false);

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
