import * as actionTypes from './actionTypes';


// setSelectedChat

export const setActiveChat = chatId => {
    return {
        type: actionTypes.SET_ACTIVE_CHAT,
        payload: {
            chatId: chatId
        }
    }
};

// getChats

export const getChats = () => {
    return {
        type: actionTypes.GET_CHATS,
    };
};

export const getChatsStart = () => {
    return {
        type: actionTypes.GET_CHATS_START
    }
};

export const getChatsSuccess = (chats) => {
    return {
        type: actionTypes.GET_CHATS_SUCCESS,
        payload: {
            chats: chats
        }
    }
};

// joinChat

export const joinChat = (chatId, userId, socket) => {
    return {
        type: actionTypes.JOIN_CHAT,
        payload: {
            chatId: chatId,
            userId: userId,
            socket: socket
        }
    };
};

export const joinChatStart = () => {
    return {
        type: actionTypes.JOIN_CHAT_START
    }
};

export const joinChatSuccess = (chatId, user) => {
    return {
        type: actionTypes.JOIN_CHAT_SUCCESS,
        payload: {
            chatId: chatId,
            user: user
        }
    }
};

// leaveChat

export const leaveChat = (chatId, userId, socket) => {
    return {
        type: actionTypes.LEAVE_CHAT,
        payload: {
            chatId: chatId,
            userId: userId,
            socket: socket
        }
    };
};

export const leaveChatStart = () => {
    return {
        type: actionTypes.LEAVE_CHAT_START
    }
};

export const leaveChatSuccess = (chatId, userId) => {
    return {
        type: actionTypes.LEAVE_CHAT_SUCCESS,
        payload: {
            chatId: chatId,
            userId: userId
        }
    }
};

// deleteChat

export const deleteChat = (chatId) => {
    return {
        type: actionTypes.DELETE_CHAT,
        payload: {
            chatId: chatId
        }
    };
};
