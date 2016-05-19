import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';
import merge from 'lodash/merge';

// function posts(state={items:[]},action) {
//   switch (action.type) {
//     case 'RECEIVE_POSTS':
//       return Object.assign({},state,{items:action.posts})
//
//     default: return state
//   }
// }

function entities(state = { group: {}, topics: {}, user:{} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

const rootReducer = combineReducers({
  entities
});
export default rootReducer
