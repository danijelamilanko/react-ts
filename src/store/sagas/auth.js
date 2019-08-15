import { put, call, delay } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/index";

export function* logoutSaga(action) {
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "expirationDate");
    yield call([localStorage, "removeItem"], "userId");
    yield call([localStorage, "removeItem"], "email");
    yield call([localStorage, "removeItem"], "firstName");
    yield call([localStorage, "removeItem"], "lastName");
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.payload.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    let url = '/api/auth/signin';
    let params = {
        email: action.payload.email,
        password: action.payload.password
    };
    if (action.payload.firstName) {
        url = '/api/auth/signup';
        params['firstName'] = action.payload.firstName;
        params['lastName'] = action.payload.lastName;
    }
    try {
        const response = yield axios.post(url, params);
        const expirationDate = yield new Date(
            new Date().getTime() + 3599 * 1000
        );
        yield localStorage.setItem("token", response.data.data.token);
        yield localStorage.setItem("expirationDate", expirationDate);
        yield localStorage.setItem("userId", response.data.data.user._id);
        yield localStorage.setItem("email", response.data.data.user.email);
        yield localStorage.setItem("firstName", response.data.data.user.firstName);
        yield localStorage.setItem("lastName", response.data.data.user.lastName);
        yield put(
            actions.authSuccess(response.data.data.token, response.data.data.user._id, response.data.data.user.email, response.data.data.user.firstName, response.data.data.user.lastName, response.data.data.user.role)
        );
        yield put(actions.checkAuthTimeout(3599));
    } catch (error) {
        yield put(actions.authFail(error.response.data.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem("token");
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(
            localStorage.getItem("expirationDate")
        );
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem("userId");
            const email = yield localStorage.getItem("email");
            const firstName = yield localStorage.getItem("firstName");
            const lastName = yield localStorage.getItem("lastName");
            const role = yield localStorage.getItem("role");
            yield put(actions.authSuccess(token, userId, email, firstName, lastName, role));
            yield put(
                actions.checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            );
        }
    }
}
