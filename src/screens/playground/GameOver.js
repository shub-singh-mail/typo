import React from "react";

const GameOver = ({
    onClick
}) => (
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <h1>GAME OVER!</h1>
            <button
                type='button'
                onClick={onClick}
            >Retry</button>
        </div>
    )

export default GameOver