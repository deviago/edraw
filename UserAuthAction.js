import { FETCHING_USER, FETCHING_USER_SUCCESS, FETCHING_USER_FAILURE, FETCHING_CURRENT_USER_FAILURE, REGISTERING_USER_FAILURE } from '../constants'
import axios from 'axios';
import { loadFromStorage } from './shared/session.js';
import { api } from '../config';

export function fetchUserFromAPI(email, password) {
    return (dispatch) => {
        dispatch(getUser());

        let payload = {
            email: email,
            password: password
        };

        let headers = {
            'Content-Type': 'application/json',
        };

        axios.post(api.authenticateUser, payload, headers)
        .then(function (response) {
            if(response.status === 200) {
                const data = response.data;
                localStorage.setItem('edJwtToken', data.token);
                if(data.roles.length === 0) {
                    dispatch(getCurrentUserFailure('Error in fetching role!'))
                } else {
                    dispatch(getUserSuccess(data.user, data.roles[0]))
                }
            }
            else {
                dispatch(getCurrentUserFailure('Internal Server Problem! Try later'));
            }
        })
        .catch(function (error) {
            console.log("error", error);
            dispatch(getCurrentUserFailure('Wrong username/password'));
        });

        // dispatch(getUserSuccess(data));
    }
}

export function forgotPassword(email) {
    return (dispatch) => {
        dispatch(getUser())
    }    
}

export function getUser() {
    return {
        type: FETCHING_USER
    }
}

export function getUserSuccess(user, role) {
    return {
        type: FETCHING_USER_SUCCESS,
        user,
        role
    }
}

export function getUserFailure(err) {
  return {
    type: FETCHING_USER_FAILURE,
    message: 'Login Failed'
  }
}

export function registerUserFailure(){
    return {
        type: REGISTERING_USER_FAILURE,
        message: 'Login Failed'
      }
}

export function getCurrentUserFailure(err) {
    return {
        type: FETCHING_CURRENT_USER_FAILURE,
        message: err
    }
}
export function getCurrentUserFromApi() {
    return (dispatch) => {
        dispatch(getUser());
        if(loadFromStorage()) {
            axios.get('/api/accounts/current').then(data => {
                dispatch(getUserSuccess(data.data.user, data.data.roles[0]));
                console.log(data);
            })
                .catch(err => dispatch(getUserFailure(err)));
        }else{
            dispatch(getCurrentUserFailure('Something went wrong'));
        }
    }
}