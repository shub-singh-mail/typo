import React from "react";

const Loader = ({
    size,
    radius,
    strokeWidth,
    timeInSeconds,
    onAnimationEnd,
    resetCounter
}) => {
    return (
        <svg
            height={size + 10}
            width={size + 10}
            viewBox={`0 0 ${size + 10} ${size + 10}`}
        >
            <circle
                onAnimationEnd={onAnimationEnd}
                className='circle-progress'
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                strokeWidth={`${strokeWidth}px`}
                // Start progress marker at 12 O'Clock
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{
                    strokeDasharray: radius * Math.PI * 2,
                    strokeDashoffset: radius * Math.PI * 2,
                    animation: `${resetCounter} ${timeInSeconds}s linear`
                }} />
        </svg>
    )
}

export default Loader