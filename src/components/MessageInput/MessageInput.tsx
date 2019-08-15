import React, { Component } from 'react';

import classes from './MessageInput.module.css';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import SocketContext from '../../socket-context';

interface IMessageInputProps {
	activeChatId: any;
	socket: any;
	messageSend: any;
}

interface IMessageInputState {
	messageInputForm: any;
}

class MessageInput extends Component<IMessageInputProps, IMessageInputState> {
	state: IMessageInputState;
	
	constructor(props) {
		super(props);
		
		this.state = {
			messageInputForm: {
				message: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Enter text'
					},
					value: '',
					validation: {},
					valid: true,
					touched: false
				}
			}
		};
	}

    messageInputChanged = (newValue) => {
        const updatedMessageForm = {
            ...this.state.messageInputForm
        };
        const updatedFormElement = {
            ...updatedMessageForm['message']
        };
        updatedFormElement.value = newValue;
        updatedFormElement.touched = true;
        updatedMessageForm['message'] = updatedFormElement;

        this.setState({messageInputForm: updatedMessageForm});
    };

    sendMessage = (event) => {
        event.preventDefault();
        if (this.state.messageInputForm.message.value !== '') {
            this.props.messageSend(this.state.messageInputForm.message.value, this.props.activeChatId, this.props.socket);
            this.messageInputChanged('');
        }
    };

    onKeyPressHandler = (event) => {
        if (event.key === 'Enter') {
            this.sendMessage(event);
        }
    };

    render() {
        return (
            <form className={classes.MessageInput}
                  onSubmit={(event) => {this.sendMessage(event)}}>
                <Input
                    elementType={this.state.messageInputForm.message.elementType}
                    elementConfig={this.state.messageInputForm.message.elementConfig}
                    value={this.state.messageInputForm.message.value}
                    invalid={!this.state.messageInputForm.message.valid}
                    shouldValidate={this.state.messageInputForm.message.validation}
                    touched={this.state.messageInputForm.message.touched}
                    keyPressed={(event) => this.onKeyPressHandler(event)}
                    label=''
                    changed={(event) => this.messageInputChanged(event.target.value)}/>
                <Button btnType="Success">SEND</Button>
            </form>
        );
    };
};

const MessageInputWithSocket = (props) => (
    <SocketContext.Consumer>
        {socket => <MessageInput {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default MessageInputWithSocket;
