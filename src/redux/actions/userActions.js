import {SET_USER,SET_ERRORS,CLEAR_ERRORS,LOADING_UI, SET_UNAUTHENTICATED,LOADING_USER} from '../types'
import axios from 'axios'

export const loginUser = (userData,history) => (dispatch) => {
    dispatch({type:LOADING_UI});
    axios.post('http://localhost:5000/social-10fac/us-central1/api/login',userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData())
            dispatch({type:CLEAR_ERRORS})
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUserData = () =>(dispatch) => {
    dispatch({type:LOADING_USER})
    axios.get('http://localhost:5000/social-10fac/us-central1/api/user')
    .then(res => {
        dispatch({
            type:SET_USER,
            payload:res.data
        })
    })
    .catch(err => console.log(err))
}

export const signupUser = (newUserData,history) => (dispatch) => {
    dispatch({type:LOADING_UI});
    axios.post('http://localhost:5000/social-10fac/us-central1/api/signup',newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData())
            dispatch({type:CLEAR_ERRORS})
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

const setAuthorizationHeader = (token) => {
    localStorage.setItem('FBIdToken',`Bearer ${token}`)
    const FBIdToken = `Bearer ${token}`
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization']
    dispatch({type: SET_UNAUTHENTICATED})
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({type:LOADING_USER})
    axios.post('http://localhost:5000/social-10fac/us-central1/api/user/image',formData)
    .then(() => {
        dispatch(getUserData())
    })
    .catch(err => console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type:LOADING_USER})
    axios.post('http://localhost:5000/social-10fac/us-central1/api/user',userDetails)
    .then(() => {
        dispatch(getUserData());
    })
    .catch(err => console.lof(err))
}