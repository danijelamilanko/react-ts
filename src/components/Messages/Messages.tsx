import React, { Component } from 'react';

import classes from './Messages.module.css';
import Message from './Message/Message';

interface IMessageProps {
	messages: any;
}

class Messages extends Component<IMessageProps> {
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
                        userName={message.createdBy.firstName}
                        createdAt={message.createdAt}
                        {...message}
                    />
                ))}
            </div>
        );
    }
}

export default Messages;
