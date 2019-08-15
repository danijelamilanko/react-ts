import axios from "axios/index";
import { put } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* addMessageSaga(action) {
    yield put(actions.addMessageStart());
    try {
        const response = yield axios.post(`/api/messages/chats/${action.payload.chatId}`, {
            messageBody: action.payload.messageBody
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        yield put(
            actions.addMessageSuccess(response.data.data.message)
        );
        // Tell the server that a new message was added via socket.io
        action.payload.socket.emit('new-message-added', response.data.data.message);
    } catch (error) {
    }
}

export function* getChatMessagesSaga(action) {
    yield put(actions.getChatMessagesStart());
    try {
        const response = yield axios.get(`/api/messages/chats/${action.payload.chatId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        yield put(
            actions.getChatMessagesSuccess(action.payload.chatId, response.data.data.messages)
        );
    } catch (error) {
    }
}
