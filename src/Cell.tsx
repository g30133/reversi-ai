import * as React from 'react';
import './Cell.css';

interface CellProps {
    onCellClicked: (cellIx:number) => void
    value: string
    cellIx: number
}

class Cell extends React.Component<CellProps> {
    public render() {
        let className = 'cell'
        if (this.props.value === 'X') {
          className += ' xMark'
        } else if (this.props.value === 'O') {
          className += ' oMark'
        }
        return (
            <div className={className} onClick={() => {
                this.onCellClicked()
            }} />
        )
    }

    private onCellClicked() {
        this.props.onCellClicked(this.props.cellIx)
    }
}

export default Cell