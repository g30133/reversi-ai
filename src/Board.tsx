import * as React from 'react';
import './Board.css';

import Cell from './Cell'

interface BoardProps {
    board: string[]
    onCellClicked: (cellIx:number) => void
}

class Board extends React.Component<BoardProps> {
    public render() {
        const board = []
        for(let i = 0; i < 64; i++) {
            board.push(<Cell key={i} cellIx={i} value={this.props.board[i]} onCellClicked={this.props.onCellClicked}/>)
        }
        return (
            <div className="board">
                {board}
            </div>
        )
    }
}

export default Board