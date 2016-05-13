

import { combineReducers } from 'redux';


function posts(state={items:[]},action) {
  switch (action.type) {
    case 'RECEIVE_POSTS':
      return Object.assign({},state,{items:action.posts})

    default: return state
  }
}

const rootReducer = combineReducers({
  posts
});




export default rootReducer
