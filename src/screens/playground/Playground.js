import React, { useState, useEffect } from "react";
import words from "../../utils/words";
import "./Playground.css";

const Playground = () => {

    useEffect(() => {
        document.addEventListener('keypress', wordValidator)
        return () => {
            document.removeEventListener('keypress')
        }
    },[])

    let [lives, setLives] = useState(3)
    let [currentLevel, setCurrentLevel] = useState(0)
    let [correctPart, setCorrectPart] = useState('')
    let [remainingPart, setRemainingPart] = useState(words[currentLevel])

    const wordValidator = props => {
        const { key } = props;
        const { target } = props;
        const currentWord = [...words[currentLevel]];
        if (!lives) {
        } else if (key !== currentWord[target.value.length - 1]) {
            setCorrectPart('');
            setLives(lives - 1);
            setCurrentLevel(currentLevel + 1);
            setRemainingPart(words[currentLevel]);
        } else if(target.value === words[currentLevel]){
            setCorrectPart('');
            setRemainingPart('');
            setCurrentLevel(currentLevel + 1);
            setRemainingPart(words[currentLevel]);
        } else {
            setCorrectPart(target.value);
            setRemainingPart('');
        }
    }

    const getRemainingPart = () => {
        return remainingPart.slice(correctPart.length)
    }

    const getCorrectPart = () => {
        return correctPart
    }

    return (
        <div className="Container">
            <h1 className='Current-word'>{getCorrectPart()}</h1>
            <h1 className=''>{getRemainingPart()}</h1>
        </div>
    )
}

export default Playground