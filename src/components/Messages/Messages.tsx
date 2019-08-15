import React, { Component } from 'react';

import classes from './Messages.module.css';
import Message from './Message/Message';

interface IMessageProps {
	_id: string;
	createdAt: string;
	body: string;
	chat: string;
	createdBy: {
		_id: string,
		email: string,
		firstName: string,
		lastName: string,
		role: string
	};
}

interface IMessagesProps {
	messages: IMessageProps[];
}

class Messages extends Component<IMessagesProps> {
	private messagesRef: React.RefObject<HTMLInputElement>;
	
    constructor(props) {
        super(props);
        this.messagesRef = React.createRef();
    }

    componentDidMount() {
        this.messagesRef!.current!.scrollTop = this.messagesRef!.current!.scrollHeight - this.messagesRef!.current!.clientHeight;
    }

    componentDidUpdate(prevProps) {
        this.messagesRef!.current!.scrollTop = this.messagesRef!.current!.scrollHeight - this.messagesRef!.current!.clientHeight;
    }

    render() {
        return (
            <div ref={this.messagesRef} className={classes.Messages}>
                {this.props.messages.map(message => (
                    <Message
                        key={message._id}
                        message={message}
                    />
                ))}
            </div>
        );
    }
}

export default Messages;
