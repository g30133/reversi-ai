import * as C from './constants'

import Util from './Util';

describe('first move of black at row 2 col 3', () => {
    let board:string[]
    beforeEach(() => {
        board = []
        for(let cellIx = 0; cellIx < C.BOARD_NUM_CELLS; cellIx++) {
            board.push('')
        }
        board[Util.IxFromRowCol(3,3)] = 'X'
        board[Util.IxFromRowCol(3,4)] = 'O'
        board[Util.IxFromRowCol(4,3)] = 'O'
        board[Util.IxFromRowCol(4,4)] = 'X'
        Util.dumpBoard(board)
    })

    it('the first move of black, capture(board, mark, 4, 4, 1, 0) should return [{r:3 c:4}, {r:2 c:4}]', () => {
        expect(Util.capture(board, 'X', 2, 4, 1, 0)).toEqual([{r:3, c:4}, {r:2, c:4}])
    })

    it('the first move of black, capture(board, mark, 5, 3, 0, -1) should return [{r:4 c:3}]', () => {
        expect(Util.capture(board, 'X', 5, 3, -1, 0)).toEqual([{r:4, c:3}, {r:5, c:3}])
    })

    it('the first move of black, capture(board, mark, 2, 3, 1, 1) should return []', () => {
        expect(Util.capture(board, 'X', 2, 3, 1, 1)).toEqual([])
    })

    it('the first move of black, capture(board, mark, 2, 3, -1, 0) should return []', () => {
        expect(Util.capture(board, 'X', 2, 3, -1, 0)).toEqual([])
    })

    it('whiteMove, captures(board, 7, 2)  should return []', () => {
        board[Util.IxFromRowCol(7,3)] = 'X'
        board[Util.IxFromRowCol(7,4)] = 'X'
        board[Util.IxFromRowCol(7,5)] = 'X'
        board[Util.IxFromRowCol(7,6)] = 'X'
        board[Util.IxFromRowCol(7,7)] = 'X'

        board[Util.IxFromRowCol(6,4)] = 'O'
        board[Util.IxFromRowCol(6,5)] = 'X'
        board[Util.IxFromRowCol(6,6)] = 'O'
        board[Util.IxFromRowCol(6,7)] = 'X'

        Util.dumpBoard(board)

        expect(Util.captures(board, 'O', 7, 2)).toEqual([])
    })
    
    it('whiteMove, captures(board, 0, 7)  should return []', () => {
        board[Util.IxFromRowCol(0,0)] = 'X'
        board[Util.IxFromRowCol(0,1)] = 'X'
        board[Util.IxFromRowCol(0,2)] = 'X'
        board[Util.IxFromRowCol(0,3)] = 'X'
        board[Util.IxFromRowCol(0,4)] = 'X'
        board[Util.IxFromRowCol(0,5)] = 'X'
        board[Util.IxFromRowCol(0,6)] = 'X'

        Util.dumpBoard(board)

        expect(Util.captures(board, 'O', 0, 7)).toEqual([])
    })

    it('whiteMove, captures(board, 0, 0)  should return []', () => {
        board[Util.IxFromRowCol(0,1)] = 'X'
        board[Util.IxFromRowCol(0,2)] = 'X'
        board[Util.IxFromRowCol(0,3)] = 'X'
        board[Util.IxFromRowCol(0,4)] = 'X'
        board[Util.IxFromRowCol(0,5)] = 'X'
        board[Util.IxFromRowCol(0,6)] = 'X'
        board[Util.IxFromRowCol(0,7)] = 'X'

        Util.dumpBoard(board)

        expect(Util.captures(board, 'O', 0, 7)).toEqual([])
    })

    it('whiteMove, captures(board, 7, 0)  should return []', () => {
        board[Util.IxFromRowCol(0,0)] = 'X'
        board[Util.IxFromRowCol(1,0)] = 'X'
        board[Util.IxFromRowCol(2,0)] = 'X'
        board[Util.IxFromRowCol(3,0)] = 'X'
        board[Util.IxFromRowCol(4,0)] = 'X'
        board[Util.IxFromRowCol(5,0)] = 'X'
        board[Util.IxFromRowCol(6,0)] = 'X'

        Util.dumpBoard(board)

        expect(Util.captures(board, 'O', 7, 0)).toEqual([])
    })

    it('blackMove, captures(board, 0, 0)  should return []', () => {
        board[Util.IxFromRowCol(1,0)] = 'O'
        board[Util.IxFromRowCol(2,0)] = 'O'
        board[Util.IxFromRowCol(3,0)] = 'O'
        board[Util.IxFromRowCol(4,0)] = 'O'
        board[Util.IxFromRowCol(5,0)] = 'O'
        board[Util.IxFromRowCol(6,0)] = 'O'
        board[Util.IxFromRowCol(7,0)] = 'O'

        Util.dumpBoard(board)

        expect(Util.captures(board, 'X', 0, 0)).toEqual([])
    })
})


describe.only('util helper functions', () => {
    let board:string[]
    beforeEach(() => {
        board = []
        for(let colIx = 0; colIx < C.BOARD_NUM_COLS; colIx++) {
            for(let rowIx = 0; rowIx < C.BOARD_NUM_ROWS; rowIx++) {
                board.push('')
            }
        }
        Util.dumpBoard(board)
    })

    it('testing boardevaluation', () => {
        board[0] = 'X'
        expect(Util.evaluateBoardFor(board, 'X')).toBe(200)
    })

    it('testing parityScore', () => {
        board[0] = 'X'
        expect(Util.parityScore(board, 'X')).toBe(100)
        board[1] = 'O'
        expect(Util.parityScore(board, 'X')).toBe(0)
        board[2] = 'X'
        board[3] = 'X'
        expect(Util.parityScore(board, 'X')).toBe(50)
    })

    it('testing getNumMovesFor', () => {
        board[9] = 'O'
        board[10] = 'O'
        board[11] = 'O'
        board[8] = 'X'

        expect(Util.getNumMovesFor(board, 'X')).toBe(1)
    })

    it('testing mobilityScore', () => {
        board[9] = 'O'
        board[10] = 'O'
        board[11] = 'O'
        board[8] = 'X'
        expect(Util.mobilityScore(board, 'X')).toBe(100)
    })

    it('testing cornerScore', () => {
        board[0] = 'X'
        expect(Util.cornerScore(board, 'X')).toBe(100)
    })

    it('testing getNextMoves', () => {
        board[10] = 'O'
        board[11] = 'O'
        board[12] = 'O'
        board[9] = 'X'
        board[4] = 'X'
        expect(Util.getNextMoves(board, 'X')).toEqual([13, 18, 20])
    })

    it.only('testing minimax', () => {
        board[27] = 'X'
        board[28] = 'O'
        board[35] = 'O' 
        board[36] = 'X'
        expect(Util.minimax_search(board, 1, 'X')).toBe(29)
    })

})
