import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import union from 'lodash/union'
import { reducer as form } from 'redux-form'


// function posts(state={items:[]},action) {
//   switch (action.type) {
//     case 'RECEIVE_POSTS':
//       return Object.assign({},state,{items:action.posts})
//
//     default: return state
//   }
// }

function entities(state = { topics: {}, group: {},  user:{} }, action) {
  if (action.response && action.response.entities) {
    //return merge({}, state, action.response.entities)
    return merge({}, state, action.response.entities)
  }
  return state
}

const types=[ActionTypes.POST_REQUEST,ActionTypes.POST_SUCCESS,ActionTypes.POST_FAILURE]
const [ requestType, successType, failureType ] = types

function contents(state={ids:[]},action) {
  switch (action.type) {
    case successType:
    return merge({}, state, {
        ids: action.response.result.contents
      })
    default:
      return state
  }
}
function topics(state={ids:[]},action) {
  switch (action.type) {
    case successType:
    return merge({}, state, {

        //ids: union(state.ids, action.response.result.topics)
        ids: action.response.result.topics

      })
    default:
      return state
  }
}
function groups(state={ids:[]},action) {
  switch (action.type) {
    case successType:
    return merge({}, state, {

        ids: union(state.ids, action.response.result.groups)

      })
    default:
      return state
  }
}
const authTypes=[ActionTypes.SIGNIN_REQUEST,ActionTypes.SIGNIN_SUCCESS,ActionTypes.SIGNIN_FAILURE]
const [SIGNIN_REQUEST,SIGNIN_SUCCESS,SIGNIN_FAILURE]=authTypes
function auth(state={authenticated:false},action){
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return merge({},state,{
        authenticated:true
      })
    case 'signout':
      return merge({},state,{authenticated:false})
    case 'signin':
      return merge({},state,{authenticated:true})
    default:
      return state

  }
}
function SelectedGroup(state={},action) {
  if(action.type='GROUP_SELECTED'){
    return merge({},state,{
      Group:action.SelectedGroup
    })
  }
}

const rootReducer = combineReducers({
  entities,
  contents,
  topics,
  groups,
  form,
  auth,
  SelectedGroup
});
export default rootReducer
