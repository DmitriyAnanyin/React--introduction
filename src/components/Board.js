import React from "react";
import Square from './Square'

export default class Board extends React.Component {
    
    renderSquare(i) {

        return (
            <Square 
                key={i} 
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)} 
            />
        )
    }

    render() {

        const boardContent = () => {
            let contentBox = []
            let contentItem = []
            let i = 0
            let j = 0
            let jMax = 3

            for ( i; i < 3; i++) {

                for (j*i; j < jMax; j++) {
                    contentItem.push(this.renderSquare(j))
                }
                jMax += 3

                contentBox.push(
                    <div className="board-row" key={i}>
                        {contentItem}
                    </div>
                )

                contentItem = []
            }

            return contentBox
        }

        return (
            <div>
                {boardContent()}
            </div>
        );
    }
    
}