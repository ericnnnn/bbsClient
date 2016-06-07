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


function fetchTopics(groupId) {
  return {
    [CALL_API]:{
      types:[POST_REQUEST,POST_SUCCESS,POST_FAILURE],
      schema:Schemas.TOPICS,
      httpmethod:"get",
      endpoint:`https://enserver.herokuapp.com/topics?groupId=${groupId}`
    }
  }
}

export function loadTopicLists(groupId) {
  return (dispatch,getState)=>{
    return dispatch(fetchTopics(groupId))
  }
}

function fetchContent(groupId,topicId) {
  return {
    [CALL_API]:{
      types:[POST_REQUEST,POST_SUCCESS,POST_FAILURE],
      schema:Schemas.CONTENTS,
      httpmethod:"get",
      endpoint:`https://enserver.herokuapp.com/contents?groupId=${groupId}&topicId=${topicId}`
    }
  }
}
export function loadContent(groupId,topicId) {
  return (dispatch,getState)=>{
    return dispatch(fetchContent(groupId,getState().SelectedTopic.Topic))
  }
}

export function topicClick(groupId,topicId) {
  return (dispatch,getState)=>{
    dispatch(selectTopic(topicId));
    return dispatch(fetchContent(getState().SelectedGroup.Group,getState().SelectedTopic.Topic))
  }
}
export function selectGroup(groupId) {
  //console.log('selectGroup:'+groupId);
  return {
      type: 'GROUP_SELECTED',
      SelectedGroup:groupId
  }
}

export function selectTopic(topicId) {
  return {
    type: 'TOPIC_SELECTED',
    SelectedTopic:topicId
  }
}

// export function selectGroupD(group) {
//   return (dispatch,getState)=>{
//       return dispatch(selectGroup(group))
//   }
// }
export function selectGroupWithDispatch(groupId) {
  return (dispatch,getState)=>{
    dispatch(selectGroup(groupId));
    dispatch(selectTopic(null));
    return dispatch(fetchTopics(groupId))
  }
}
