import * as actionTypes from './actionTypes';

// getChatMessages

export const getChatMessages = (chatId) => {
    return {
        type: actionTypes.GET_CHAT_MESSAGES,
        payload: {
            chatId: chatId
        }
    };
};

export const getChatMessagesStart = () => {
    return {
        type: actionTypes.GET_CHAT_MESSAGES_START
    }
};

export const getChatMessagesSuccess = (chatId, messages) => {
    return {
        type: actionTypes.GET_CHAT_MESSAGES_SUCCESS,
        payload: {
            chatId: chatId,
            messages: messages
        }
    }
};

// addMessage

export const addMessage = (messageBody, chatId, socket) => {
    return {
        type: actionTypes.ADD_MESSAGE,
        payload: {
            messageBody: messageBody,
            chatId: chatId,
            socket: socket
        }
    };
};

export const addMessageStart = () => {
    return {
        type: actionTypes.ADD_MESSAGE_START
    }
};

export const addMessageSuccess = message => {
    return {
        type: actionTypes.ADD_MESSAGE_SUCCESS,
        payload: {
            message: message
        }
    }
};
