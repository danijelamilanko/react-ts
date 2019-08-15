import { put } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/index";

export function* getChetsSaga(action) {
    yield put(actions.getChatsStart());
    try {
        const response = yield axios.get(`/api/chats`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        yield put(
            actions.getChatsSuccess(response.data.data.chats)
        );
    } catch (error) {
    }
}

export function* joinChatSaga(action) {
    yield put(actions.joinChatStart());
    try {
        const response = yield axios.post(`/api/chats/${action.payload.chatId}/members`, {
            newMemberUserId: action.payload.userId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.data.data.alreadyExists) {
            yield put(
                actions.joinChatSuccess(action.payload.chatId, response.data.data.user)
            );
            // Tell the server that a user joined the chat via socket.io
            action.payload.socket.emit('joined-chat', { chatId: action.payload.chatId, user: response.data.data.user});
        } else {
            // Tell the server that a user already joined the chat via socket.io
            action.payload.socket.emit('joined-chat-already', { chatId: action.payload.chatId, user: response.data.data.user});
        }
    } catch (error) {
    }
}

export function* leaveChatSaga(action) {
    yield put(actions.leaveChatStart());
    try {
        yield axios.delete(`/api/chats/${action.payload.chatId}/members/${action.payload.userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        yield put(
            actions.leaveChatSuccess(action.payload.chatId, action.payload.userId)
        );
        // Tell the server that a user left the chat via socket.io
        action.payload.socket.emit('left-chat', { chatId: action.payload.chatId, userId: action.payload.userId});
    } catch (error) {
    }
}
