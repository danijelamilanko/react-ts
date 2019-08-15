import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga
} from "./auth";
import {
    getChetsSaga,
    joinChatSaga,
    leaveChatSaga
} from "./chat";
import {
    addMessageSaga,
    getChatMessagesSaga
} from "./message";

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchChat() {
    yield takeEvery(actionTypes.GET_CHATS, getChetsSaga);
    yield takeEvery(actionTypes.JOIN_CHAT, joinChatSaga);
    yield takeEvery(actionTypes.LEAVE_CHAT, leaveChatSaga);
}


export function* watchMessage() {
    yield takeEvery(actionTypes.ADD_MESSAGE, addMessageSaga);
    yield takeEvery(actionTypes.GET_CHAT_MESSAGES, getChatMessagesSaga);
}
