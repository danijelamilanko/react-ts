import * as actionTypes from "./actionTypes";

export const auth = (email, password, firstName, lastName) => {
    return {
        type: actionTypes.AUTH_USER,
        payload: {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        }
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, firstName, lastName, role) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            role: role
        }
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: {
            error: error
        }
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        payload: {
            expirationTime: expirationTime
        }
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        payload: {
            path: path
        }
    };
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
};
