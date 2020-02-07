import React, { useState, useEffect, useCallback } from "react";
import words from "../../utils/words";
import "./Playground.css";

const Playground = () => {

    let [playerData, setPlayerData] = useState({
        lives: 3,
        currentLevel: 0,
        correct: '',
        remaining: words[0]
    })

    const wordValidator = useCallback(props => {
        const { key } = props;
        const currentWord = [...words[playerData.currentLevel]];
        if (playerData.lives) {
            const currentString = playerData.correct.concat(key);

            if (currentString === words[playerData.currentLevel]) {
                setPlayerData((prevData) => ({
                    ...prevData,
                    correct: '',
                    remaining: words[prevData.currentLevel + 1],
                    currentLevel: prevData.currentLevel + 1,
                }))
            } else if (key !== currentWord[playerData.correct.length]) {
                setPlayerData((prevData) => ({
                    ...prevData,
                    correct: '',
                    lives: prevData.lives - 1,
                    remaining: words[prevData.currentLevel + 1],
                    currentLevel: prevData.currentLevel + 1,
                }))
            } else {
                setPlayerData((prevData) => ({
                    ...prevData,
                    remaining: prevData.remaining.slice(1),
                    correct: currentString,
                }))
            }
        }
    },[playerData.lives, playerData.currentLevel, playerData.correct])

    useEffect(() => {
        console.log('connected')
        document.addEventListener('keypress', wordValidator)
        return () => {
            console.log('removed')
            document.removeEventListener('keypress', wordValidator)
        }
    }, [wordValidator])

    return (
        <div className="Container">
            <h1 className='Current-word'>{playerData.correct}</h1>
            <h1>{playerData.remaining}</h1>
        </div>
    )
}

export default Playground