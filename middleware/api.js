import fetch from 'isomorphic-fetch'
import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'



function callApi(endpoint, schema) {

 //debugger;
  return fetch('https://enserver.herokuapp.com/topics')
        .then(respones=>respones.json())
        .then(json=>{
          const camelizedJson = camelizeKeys(json)
//debugger;
          //console.log(normalize(camelizedJson,schema));

          return normalize(camelizedJson,schema)
        })

        .catch(e=>console.log(e))
}

export const topic=new Schema('topics');
export const groupSchema =new Schema('group');
export const userSchema=new Schema('user');
topic.define({
   user:userSchema,
   group:groupSchema   
 });

export const Schemas={
  TOPICS:{
          topics:arrayOf(topic)
        }}

export const CALL_API = Symbol('Call API')

export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    console.log(callAPI);
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}
