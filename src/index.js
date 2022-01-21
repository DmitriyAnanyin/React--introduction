import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board';

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            prevStep: null,
            coordsMoveArr: ['0/0'],
            winnerLine: [],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()

        const coordsMoveArr = this.state.coordsMoveArr.slice()
        coordsMoveArr.push(this.coordStep(i))

        if (this.calculateWinner(squares) || squares[i]) {
            return
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O'


        this.setState({
            history: history.concat([{
                squares
            }]),
            prevStep: i,
            coordsMoveArr: coordsMoveArr,
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    coordStep(prevStep) {
        let xCord = 0, yCord = 0

        if (prevStep < 3) {
            xCord = 1
            yCord = prevStep + 1
        } else if (prevStep < 6) {
            xCord = 2
            yCord = prevStep -3 + 1
        } else {
            xCord = 3
            yCord = prevStep -6 + 1
        }

        return (xCord + '/' + yCord).toString()
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = this.calculateWinner(current.squares)

        const moves = history.map((step, move) => {
            const desc = move ?
            'Перейти к ходу №' + move + 
            ' (' + this.state.coordsMoveArr[move] + ')':
            'К началу игры'

            let className

            if (this.state.stepNumber === move) {
                className = 'active'
            }

            return (
                <li key={move}>
                    <button className={className} onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            )
        })

        let status

        if (winner) {
            status = 'Выиграл ' + winner[0]
            this.state.winnerLine = [winner[1],winner[2],winner[3]]

        } else if (this.state.stepNumber === 9) {
            status = 'Ничья!'
        } else {
            status = 'Следующий ход ' + (this.state.xIsNext ? 'X' : 'O')
        }

        return (
        <div className="game">
            <div className="game-board">
                <Board 
                    winnerLine={this.state.winnerLine}
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
        );
    }

    calculateWinner(squares) {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ]

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return [squares[a], a,b,c]
            }
        }
        return null
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
