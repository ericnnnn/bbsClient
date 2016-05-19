import {CALL_API,Schemas} from '../middleware/api'

// import fetch from 'isomorphic-fetch'
// import { Schema, arrayOf, normalize } from 'normalizr'
// import { camelizeKeys } from 'humps'
//
// export const REQUEST_POSTS = 'REQUEST_POSTS'
// export const RECEIVE_POSTS = 'RECEIVE_POSTS'
//
//
// export const topic=new Schema('topics');
// export const groupSchema =new Schema('group');
// export const userSchema=new Schema('user');
//  topic.define({
//    group:groupSchema,
//    user:userSchema
//  });
//
// function receivePosts(json) {
//   return {
//     type: 'RECEIVE_POSTS',
//     posts: json
//   }
// }
//export function fetchPosts() {
//   return dispatch=>{
//     return fetch('http://localhost:3000/topics')
//       .then(respones=>respones.json())
//       .then(json=>{
//         const camelizedJson = camelizeKeys(json)
//         //console.log(camelizedJson)
//         dispatch(receivePosts(normalize(camelizedJson, {
//                   topics:arrayOf(topic)
//
//                   })))})
//
//       .catch(e=>console.log(e))
//
//   }
// }

export const POST_REQUEST = 'POST_REQUEST'
export const POST_SUCCESS = 'POST_SUCCESS'
export const POST_FAILURE = 'POST_FAILURE'

function fetchPosts() {
  return {
    [CALL_API]:{
      types:[POST_REQUEST,POST_SUCCESS,POST_FAILURE],
      schema:Schemas.TOPICS,
      endpoint:''
    }
  }
}

export function loadPost() {
  return (dispatch,getState)=>{
    return dispatch(fetchPosts())
  }
}
