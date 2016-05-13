import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

function receivePosts(json) {
  return {
    type: 'RECEIVE_POSTS',
    posts: json
  }
}
export function fetchPosts() {
  return dispatch=>{
    return fetch('http://localhost:3000/topics')
      .then(respones=>respones.json())
      .then(json=>dispatch(receivePosts(json)))
      .catch(e=>console.log(e))

  }
}
