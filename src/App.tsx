import * as React from 'react';
import './App.css';

import * as C from "./constants";

import Board from './Board'
import Message from './Message'
import Util from './Util'

interface AppState {
  board: string[]
  xTurn: boolean
  winner: string
}

class App extends React.Component<any, AppState> {
  constructor(props:any) {
    super(props)

    this.onCellClicked = this.onCellClicked.bind(this)

    this.state = {
      board:
      [
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', 'X', 'O', '', '', '',
        '', '', '', 'O', 'X', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
      ],
      xTurn: true,
      winner: ''
    }
  }
  public render() {
    return (
      <div className="app">
        <Board board={this.state.board} onCellClicked={this.onCellClicked}/>
        <Message xTurn={this.state.xTurn} winner={this.state.winner}/>
      </div>
    );
  }

  private onCellClicked(cellIx:number) {
    const captures = Util.captures(this.state.board, (this.state.xTurn ? 'X' : 'O'), Math.floor(cellIx/C.BOARD_NUM_COLS), cellIx%C.BOARD_NUM_COLS)
    if(captures.length > 0) {
      console.log('THATS A GOOD MOVE!')
      const newBoard = Array.from(this.state.board)
      for(const capture of captures) {
        const cellIx = Util.IxFromRowCol(capture.r, capture.c)
        newBoard[cellIx] = this.state.xTurn ? 'X' : 'O'
      }
      this.setState((prevState) => {
        return {
          board: newBoard,
          xTurn: !prevState.xTurn
        }
      })
    } else {
      console.log('THATS A BAD MOVE')
    }
  }
}

export default App;
