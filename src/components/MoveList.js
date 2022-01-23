import React from "react";

export default function MoveList(props) {
    return props.state.history.map((step, move) => {
        const desc = move ?
        'Перейти к ходу №' + move + 
        ' (' + props.state.coordsMoveArr[move] + ')':
        'К началу игры'

        let className

        if (props.state.stepNumber === move) {
            className = 'active'
        }

        return (
            <li key={move}>
                <button className={className} onClick={() => props.setState(jumpTo(move))}>
                    {desc}
                </button>
            </li>
        )
    })
}

function jumpTo(step) {
    return {
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        winnerLine: []
    }
}