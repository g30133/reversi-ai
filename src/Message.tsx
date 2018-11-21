import * as React from 'react';
import './Message.css';

interface MessageProps {
    xTurn: boolean
    winner: string
}

class Message extends React.Component<MessageProps> {
    public render() {
        let message = ''
        if(this.props.xTurn === true) {
            message = 'Black Turn'
        } else {
            message = 'White Turn'
        }

        if(this.props.winner === 'tie') {
            message = 'its a tie game'
        } else if(this.props.winner !== '') {
            message = this.props.winner + ' is the winner'
        }

        return (
            <div className='message'>{message}</div>
        )
    }
}

export default Message