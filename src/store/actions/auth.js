import axios from '../../axios-SE';
import * as actionTypes from './actionTypes';
import { authRequestTimeoutSec } from '../../shared/consts';
import { login, register } from "../../api/auth";

import { toast } from 'react-toastify';

let authRequestInterceptor;

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, email, IsAuthorized) => {
    authRequestInterceptor = axios.interceptors.request.use(request => {
        request.headers.Authorization = `Bearer ${token}`;
        return request;
    });

    return {
        type: actionTypes.AUTH_SUCCESS,
        email: email,
        idToken: token,
        IsAuthorized: IsAuthorized,
    };
};

// const authFail = (error) => {
//     return {
//         type: actionTypes.AUTH_FAIL,
//         error: error
//     };
// };

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('email');
    localStorage.removeItem('IsAuthorized');
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

export const authReg = (gmail, name) => (dispatch) => {
    dispatch(authStart());
    let authData = {
        email: gmail,
        name: name,
        gender: "Male",
        age: 23,
        postalcode: "81400",
        address: "Thotupola road, Hiththatiya, Matara",
    }
    console.log(authData)
    register(authData)
        .then((response) => {
            console.log(response)
            console.log(response.data)
            if (response.data) {
                // const expirationDate = new Date(new Date().getTime() + authRequestTimeoutSec * 1000);
                // localStorage.setItem('email', response.data.UserEmail);
                // localStorage.setItem('token', response.data.Token.value);
                // localStorage.setItem('expirationDate', expirationDate);
                // localStorage.setItem('IsAuthorized', response.data.IsAuthorized);
                // dispatch(authSuccess(response.data.token, response.data.UserEmail,response.data.IsAuthorized));
                // dispatch(checkAuthTimeout(authRequestTimeoutSec));
                    toast.success('Password Sent to email', {
                        position: "top-right",
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
            } else {
                toast.error(response.error.response.data.Message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
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
                console.log(response.data);
                const expirationDate = new Date(new Date().getTime() + authRequestTimeoutSec * 1000);
                localStorage.setItem('email', response.data.UserEmail);
                localStorage.setItem('token', response.data.Token.value);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('IsAuthorized', response.data.IsAuthorized);
                dispatch(authSuccess(response.data.Token.value, response.data.UserEmail, response.data.IsAuthorized));
                dispatch(checkAuthTimeout(authRequestTimeoutSec));
            } else {
                toast.error(response.error.response.data.Message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
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
            const isauthorized = localStorage.getItem('IsAuthorized');
            dispatch(authSuccess(token, email, isauthorized));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}
