import React, { useState, useEffect, useCallback, useReducer } from "react";
import words from "../../constants/words";
import Heart from "../../components/heart";
import Loader from "../../components/loader";
import GameOver from "./GameOver";
import "./Playground.css";

const size = 30;
const strokeWidth = 5;
const radius = (size - strokeWidth) / 2;
const initialState = {
    lives: 3,
    currentLevel: 0,
    correct: '',
    remaining: words[0]
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'Complete':
            return {
                ...state,
                correct: '',
                remaining: words[state.currentLevel + 1],
                currentLevel: state.currentLevel + 1,
            }
        case 'Incorrect':
            return {
                ...state,
                correct: '',
                lives: state.lives - 1,
                remaining: words[state.currentLevel + 1],
                currentLevel: state.currentLevel + 1,
            }
        case 'Correct':
            return {
                ...state,
                remaining: state.remaining.slice(1),
                correct: action.currentString,
            }
        case 'Retry':
            return {
                ...initialState
            }
        default:
            throw new Error()
    }
}

const Playground = () => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [animationName, setAnimationName] = useState('countdown-animation')
    const [isFocused, setIsFocused] = useState(false)

    const toogleFocusScreen = isWindowFocused => setIsFocused(isWindowFocused)

    const resetLoaderAnimation = () => {
        setAnimationName('')
        setTimeout(() => {
            setAnimationName('countdown-animation')
        })
    }

    const wordValidator = useCallback((props) => {
        const { key } = props;
        const currentWord = [...words[state.currentLevel]];
        if (state.lives) {
            const currentString = state.correct.concat(key);
            if (currentString === words[state.currentLevel]) {
                dispatch({ type: 'Complete' })
                resetLoaderAnimation()
            } else if (key !== currentWord[state.correct.length]) {
                dispatch({ type: 'Incorrect' })
                resetLoaderAnimation()
            } else {
                dispatch({ type: 'Correct', currentString: currentString })
            }
        }
    }, [state.correct, state.lives, state.currentLevel])

    const getHearts = () => Array(state.lives).fill(<Heart />, 0)

    const _onAnimationEnd = () => {
        dispatch({ type: 'Incorrect' })
        resetLoaderAnimation()
    }

    useEffect(() => {
        
        document.addEventListener('keypress', wordValidator)
        window.onblur = () => toogleFocusScreen(true)
        window.onfocus = () => toogleFocusScreen(false)
        document.onblur = window.onblur
        document.onfocus = window.onfocus
        return () => {
            document.removeEventListener('keypress', wordValidator)
        }
    }, [wordValidator])

    return (
        <>
            {
                isFocused ? <div><h1>YOU ARE NOT FOCUSED !! CLICK TO RESUME AGAIN</h1></div> :
                    state.lives ?
                        <>
                            <div className='Header'>
                                {getHearts()}
                            </div>
                            <div className="Container">
                                <h1 className='Current-word'>{state.correct}</h1>
                                <h1>{state.remaining}</h1>
                                <Loader
                                    timeInSeconds={words[state.currentLevel].length / 2}
                                    onAnimationEnd={_onAnimationEnd}
                                    resetCounter={animationName}
                                    {...{
                                        size,
                                        radius,
                                        strokeWidth
                                    }}
                                />
                            </div>
                        </>
                        :
                        <GameOver onClick={() => dispatch({ type: 'Retry' })} />
            }
        </>
    )
}

export default Playground