import * as C from "./constants";

class Util {
    public static dumpBoard(board:string[]) {
        //console.log(`dumpBoard(${board})`)
        let dump:string = ''
        for (let cellIx = 0; cellIx < C.BOARD_NUM_CELLS; cellIx++) {
            if (cellIx % C.BOARD_NUM_COLS === 0) {
                dump += '\n'
            }
            dump += (board[cellIx] === '') ? '.' : board[cellIx]
        }
        console.log(dump)
    }

    public static IxFromRowCol(rowIx:number, colIx:number) {
        return rowIx * C.BOARD_NUM_COLS + colIx
    }

    public static captures(board:string[], mark:string, rowIx:number, colIx:number) {
        let captures:any[] = []
        captures = captures.concat(Util.capture(board, mark, rowIx, colIx, -1, 0))
        captures = captures.concat(Util.capture(board, mark, rowIx, colIx, -1, 1))
        captures = captures.concat(Util.capture(board, mark, rowIx, colIx, 0, 1))
        captures = captures.concat(Util.capture(board, mark, rowIx, colIx, 1, 1))
        captures = captures.concat(Util.capture(board, mark, rowIx, colIx, 1, -1))
        captures = captures.concat(Util.capture(board, mark, rowIx, colIx, 1, 0))
        captures = captures.concat(Util.capture(board, mark, rowIx, colIx, 0, -1))
        captures = captures.concat(Util.capture(board, mark, rowIx, colIx, -1, -1))
        // console.log('CAPTURES:::(' + JSON.stringify(captures) + ')')
        
        return captures
    }

    public static capture(board:string[], mark:string, rowIx:number, colIx:number, rowDelta:number, colDelta:number) {
        let captureLine:any[] = []
        for(let i = 1; i < C.BOARD_NUM_COLS; i++) {
            const nextRowIx = rowIx + rowDelta * i
            const nextColIx = colIx + colDelta * i
            const nextValue = board[Util.IxFromRowCol(nextRowIx, nextColIx)]
            // console.log('nextRowIx:' + nextRowIx + ' nextColIx:' + nextColIx + ' boardValue:' + nextValue + ' mark:' + mark)
            if(Util.isOnBoard(nextRowIx, nextColIx) && board[Util.IxFromRowCol(rowIx, colIx)] === '') {
                if(nextValue === '') {
//                    console.log('NEXT VALUE IS EMPTY!')
                    captureLine = []
                    break
                }
                else if(nextValue === mark) {
                    // console.log('NEXT VALUE IS SAME MARK!')
                    if(captureLine.length > 0) {
                        captureLine = captureLine.concat({r: rowIx, c: colIx})
                    }
                    break
                } else {
//                    console.log('NEXT VALUE IS DIFFERENT MARK!')
                    captureLine = captureLine.concat({r: nextRowIx, c: nextColIx})
                }
            } else {
                // console.log('GOES OUT OF BOARD!!!')
                captureLine = []
                break
            }

            if(i === C.BOARD_NUM_COLS-1) {
                // console.log('THE LAST I!!!')
                captureLine = []
                break
            }
        }
        // console.log('CAPTURED(' + rowDelta + ':' + colDelta + '):' + JSON.stringify(captureLine))
        // console.log(captureLine)
        return captureLine
    }

    public static isOnBoard(rowIx:number, colIx:number) {
        return rowIx >= 0 && rowIx < C.BOARD_NUM_ROWS && colIx >= 0 && colIx < C.BOARD_NUM_COLS
    }


    public static evaluateBoardFor(board:string[], maximizerToken:string) {
        let score = 0
        const parityScore = Util.parityScore(board, maximizerToken)
        const mobilityScore = Util.mobilityScore(board, maximizerToken)
        const cornerScore = Util.cornerScore(board, maximizerToken)

        // console.log('parityScore:' + parityScore)
        // console.log('mobilityScore:' + mobilityScore)
        // console.log('cornerScore:' + cornerScore)

        score += parityScore
        console.log('returning evaluate score:' + score)
        score += mobilityScore
        console.log('returning evaluate score:' + score)
        score += cornerScore
        console.log('cornerScore:' + cornerScore)
        console.log('returning evaluate score:' + score)
        return score
    }

    public static parityScore(board:string[], maximizerToken:string) {
        const otherToken = maximizerToken == 'X' ? 'O' : 'X'
        const numMax = Util.getNumCoinsFor(board, maximizerToken)
        const numMin = Util.getNumCoinsFor(board, otherToken)

        const parityScore = 100 * (numMax - numMin) / (numMax + numMin)
        return parityScore
    }

    public static mobilityScore(board:string[], maximizerToken:string) {
        const otherToken = maximizerToken == 'X' ? 'O' : 'X'
        let numMax = Util.getNumMovesFor(board, maximizerToken)
        let numMin = Util.getNumMovesFor(board, otherToken)
        // console.log('numMax:' + numMax)
        // console.log('numMin:' + numMin)

        let mobilityScore = 0
        if(numMax + numMin !== 0) {
            mobilityScore = 100 * (numMax - numMin) / (numMax + numMin)
        }
        return mobilityScore
    }

    public static cornerScore(board:string[], maximizerToken:string) {
        const otherToken = maximizerToken == 'X' ? 'O' : 'X'
        let numMax = Util.getNumCornersFor(board, maximizerToken)
        let numMin = Util.getNumCornersFor(board, otherToken)
        let cornerScore = 0
        if(numMax + numMin !== 0) {
            cornerScore = 100 * (numMax - numMin) / (numMax + numMin)
        }
        return cornerScore
    }

    //For parity
    public static getNumCoinsFor(board:string[], token:string) {
        let numCoins = 0
        for(const cell of board) {
            if(cell == token) {
                numCoins++
            }
        }
        return numCoins
    }

    //For mobility
    public static getNumMovesFor(board:string[], token:string) {
        let numMoves = 0
        Util.dumpBoard(board)
        for(let boardIx = 0; boardIx < board.length; boardIx++) {
            // console.log('boardIx:' + boardIx)
            // console.log('rowIx:' + Math.floor(boardIx/C.BOARD_NUM_COLS))
            // console.log('colIx:' + boardIx%C.BOARD_NUM_COLS)
            const captures = Util.captures(board, token, Math.floor(boardIx/C.BOARD_NUM_COLS), boardIx%C.BOARD_NUM_COLS)
            // console.log('captureslen:' + captures.length)
            if(captures.length > 0) {
                numMoves++
            }
            // console.log('numMoves:' + numMoves)
        }
        return numMoves
    }

    public static getNumCornersFor(board:string[], token:string) {
        let numCorners = 0
        if(board[0] == token) {
            numCorners++
        }
        if(board[7] == token) {
            numCorners++
        }
        if(board[56] == token) {
            numCorners++
        }
        if(board[63] == token) {
            numCorners++
        }
        return numCorners
    }

    public static getNextMoves(board:string[], token:string) {
        const nextMovesIx = []
        for(let boardIx = 0; boardIx < board.length; boardIx++) {
            const captures = Util.captures(board, token, Math.floor(boardIx/C.BOARD_NUM_COLS), boardIx%C.BOARD_NUM_COLS)
            if(captures.length > 0) {
                nextMovesIx.push(boardIx)
            }
        }
        return nextMovesIx
    }

    public static isGameOver(board:string[]) {
        for(const index of board) {
            if(board[index] == '') {
                return false
            }
        }
        return true
    }


    public static deepcopyBoard(board:string[]) {
        const newBoard = []
        for (let i = 0; i < board.length; i++) {
            newBoard[i] = (board[i])
        }
        return newBoard
    }

    public static moveOnBoard(board:string[], cellIx:number, token:string) {
        const newBoard = Util.deepcopyBoard(board)

        if (newBoard[cellIx] == '') {
            newBoard[cellIx] = token
        }            

        return newBoard
    }

    public static moveOnBoardWithoutCopy(board:string[], cellIx:number, token:string) {
        //const newBoard = Util.deepcopyBoard(board)

        if (board[cellIx] == '') {
            board[cellIx] = token
        }  

        return board
    }

    public static unmoveOnBoardWithoutCopy(board:string[], cellIx:number, token:string) {
        // TODO
        if(board[cellIx] == token) {
            board[cellIx] = ''
        }
        return board
    }

    public static minimax(board:string[], depth:number, isMaximizer:Boolean, maximizerToken:string) {
        let value = 0

        if(depth == 0 || Util.isGameOver(board)) {
            value = Util.evaluateBoardFor(board, maximizerToken)
            console.log('evaluating board:' + value)
        }
        else {
            if(isMaximizer) {
                value = -Infinity
                const nextMoves = Util.getNextMoves(board, maximizerToken)
                for(let move of nextMoves) {
                    const newBoard = this.moveOnBoard(board, move, maximizerToken)
                    const returnValue = Util.minimax(newBoard, depth-1, false, maximizerToken)
                    if(returnValue > value) {
                        value = returnValue
                    }
                }
            }
            else {
                value = -Infinity
                const minimizerToken = (maximizerToken == 'X') ? 'O' : 'X'
                const nextMoves = Util.getNextMoves(board, minimizerToken)
                for(let move of nextMoves) {
                    const newBoard = this.moveOnBoard(board, move, minimizerToken)
                    const returnValue = Util.minimax(newBoard, depth-1, true, maximizerToken)
                    if(returnValue < value) {
                        value = returnValue
                    }
                }
            }
        }
        return value
    }

    public static minimax_search(board:string[], depth:number, maximizerToken:string) {
        let value = -Infinity
        let cellIx = -1
        const nextMoves = Util.getNextMoves(board, maximizerToken)
        for(const nextMove of nextMoves) {
            console.log('nextMove:' + nextMove)
            const returnValue = Util.minimax(board, depth-1, false, maximizerToken)
            console.log('returnValue:' + returnValue)
            if(returnValue > value) {
                value = returnValue
                cellIx = nextMove
            }
        }

        console.log('returning cellIndex:' + cellIx) 
        return cellIx
    }

    public static aiMove(board:string[], depth:number, aiToken:string) {
        return Util.minimax_search(board, depth, aiToken)
    }
}


export default Util