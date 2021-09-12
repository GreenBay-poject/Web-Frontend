import axios from '../../axios-SE';
import * as actionTypes from './actionTypes';
import { authRequestTimeoutSec } from '../../shared/consts';
import { login, register } from "../../api/auth";

let authRequestInterceptor;

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, email) => {
    authRequestInterceptor = axios.interceptors.request.use(request => {
        request.headers.Authorization = `Bearer ${token}`;
        return request;
    });

    return {
        type: actionTypes.AUTH_SUCCESS,
        email: email,
        idToken: token,
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('email');
    axios.interceptors.request.eject(authRequestInterceptor);
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};
 
const checkAuthTimeout = (expirationTime) => (dispatch) => {
    setTimeout(() => {
        dispatch(authLogout());
    }, expirationTime * 1000)
};

export const authReg = (gmail, name, gender,age, postalcode, address) => (dispatch) => {
    dispatch(authStart());
    let authData = {
        email: gmail,
        name: name,
        gender: gender,
        age: age,
        postalcode: postalcode,
        address: address,
    }
    console.log(authData)
    register(authData)
        .then((response) => {
            console.log(response)
            console.log(response.data)
            if (response.data) {
                const expirationDate = new Date(new Date().getTime() + authRequestTimeoutSec * 1000);
                localStorage.setItem('email', response.data.UserEmail);
                localStorage.setItem('token', response.data.Token.value);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data.token, response.data.UserEmail));
                dispatch(checkAuthTimeout(authRequestTimeoutSec));
            } else {
                dispatch(authFail('Invalid Entry'));
            }
            if (response.error){
                dispatch(authFail('Invalid Entry'));
            }
        });
}

export const auth = (email, password) => (dispatch) => {
    dispatch(authStart());
    let authData = {
        email: email,
        password: password,
    }

    login(authData)
        .then((response) => {
            if (response.data) {
                console.log(response.data.UserEmail);
                const expirationDate = new Date(new Date().getTime() + authRequestTimeoutSec * 1000);
                localStorage.setItem('email', response.data.UserEmail);
                localStorage.setItem('token', response.data.Token.value);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data.Token.value, response.data.UserEmail));
                dispatch(checkAuthTimeout(authRequestTimeoutSec));
            } else {
                dispatch(authFail('Invalid Username or Password'));
            }
            if (response.error){
                dispatch(authFail('Invalid Username or Password'));
            }
        });
}

export const authCheckState = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(authLogout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(authLogout());
        } else {
            const email = localStorage.getItem('email');
            dispatch(authSuccess(token, email));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}
