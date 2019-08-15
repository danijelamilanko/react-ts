import * as actionTypes from '../actions/actionTypes'

const initialState = {
    messages: {}
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_CHAT_MESSAGES_SUCCESS: {
            const clonedMessages = {};
            for (let key in state.messages) {
                const clonedMessagesInAChat = state['messages'][key].map(message => {
                    return {
                        ...message,
                        createdBy: {...message.createdBy}
                    }
                });
                clonedMessages[key] = clonedMessagesInAChat;
            }
            return {
                messages: {
                    ...clonedMessages,
                    [action.payload.chatId]: action.payload.messages
                }
            }
        }
        case actionTypes.ADD_MESSAGE_SUCCESS: {
            const clonedMessages = {};
            for (let key in state.messages) {
                const clonedMessagesInAChat = state['messages'][key].map(message => {
                    return {
                        ...message,
                        createdBy: {...message.createdBy}
                    }
                });
                clonedMessages[key] = clonedMessagesInAChat;
                if (key === action.payload.message.chat) {
                    clonedMessages[key].push(action.payload.message);
                }
            }
            return {
                messages: clonedMessages
            }
        }
        default:
            return state;
    }
};

export default reducer;
