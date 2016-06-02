import {CALL_API,Schemas} from '../middleware/api'

import {browserHistory} from 'react-router'




export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE'

function fetchSignIn(email,password) {
  return{
    [CALL_API]:{
      types:[SIGNIN_REQUEST,SIGNIN_SUCCESS,SIGNIN_FAILURE],
      endpoint:'https://enserver.herokuapp.com/users/login',
      httpmethod:"post",
      email:email,
      password:password
    }
  }
}

export function signinUser(body) {
  return (dispatch,getState)=>{
    // browserHistory.push('/feature');
    return dispatch(fetchSignIn(body.email,body.password))
  }
}

export function signoutUser() {
  //localStorage.removeItem('token');

  return { type: 'signout' };
}

export const POST_REQUEST = 'POST_REQUEST'
export const POST_SUCCESS = 'POST_SUCCESS'
export const POST_FAILURE = 'POST_FAILURE'

function fetchPosts() {
  return {
    [CALL_API]:{
      types:[POST_REQUEST,POST_SUCCESS,POST_FAILURE],
      schema:Schemas.TOPICS,
      httpmethod:"get",
      endpoint:'https://enserver.herokuapp.com/topics'
    }
  }
}

export function loadPost() {
  return (dispatch,getState)=>{
    return dispatch(fetchPosts())
  }
}

function fetchGroups() {
  return {
    [CALL_API]:{
      types:[POST_REQUEST,POST_SUCCESS,POST_FAILURE],
      schema:Schemas.GROUPS,
      httpmethod:"get",
      endpoint:'https://enserver.herokuapp.com/groups'
    }
  }
}

export function loadGroupLists() {
  return (dispatch,getState)=>{
    return dispatch(fetchGroups())
  }
}
