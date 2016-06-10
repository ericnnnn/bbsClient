import fetch from 'isomorphic-fetch'
import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import axios from 'axios'
import { browserHistory } from 'react-router'

function callApi(endpoint, schema) {

 //debugger;
 //console.log("fetch");
  return fetch(endpoint)
        .then(respones=>respones.json())
        .then(json=>{

          //console.log(json);
          //console.log("json's length:"+length(json));
          const camelizedJson = camelizeKeys(json)
//debugger;
          //console.log('normalized object:'+normalize(camelizedJson,schema));

          return normalize(camelizedJson,schema)
        })

        .catch(e=>console.log(e))
}

function postApi(endpoint,body){
  //console.log(body);
  return axios.post(endpoint,body)
      .then(response=>{
        //console.log(response);
        //return response.headers.Auth
        return response.data.id
      })
}
function postApiContent(endpoint,body,schema){

  return axios.post(endpoint,body,{headers:{'auth':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IlUyRnNkR1ZrWDEraTA4eWZVaUlITXZabEppNnZBN2puM3YwUU45UjQzMFl2Y3dTV0lmdE9lNW5MUVRQdGU2YTdqZjJ1Y215eEQwcVhxR1NxRC9QdGRnPT0iLCJpYXQiOjE0NjUzOTcwNjZ9.Y6WisAWJmR3ct_YuuKmoi18q8nS9FhyGkehHxc2-IGo'}})
      .then(response=>{
        //console.log(response);
        //return response.headers.Auth
        //console.log({contents:[response.data]});
        return {contents:[response.data]};
      })
      //.then(respones=>respones.data.json())
      .then(json=>{

        //console.log(json);
        //console.log("json's length:"+length(json));
        const camelizedJson = camelizeKeys(json)
//debugger;
        //console.log('normalized object:'+normalize(camelizedJson,schema));

        return normalize(camelizedJson,schema)
      })

      .catch(e=>console.log(e))
}

export const topic=new Schema('topics');
export const groupSchema =new Schema('group');
export const userSchema=new Schema('user');
export const topicSchema=new Schema('topic');
export const group=new Schema('groups');
export const content=new Schema('contents');
topic.define({
   user:userSchema,
   group:groupSchema
 });
content.define({
  user:userSchema,
  group:groupSchema,
  topic:topicSchema
});
export const Schemas={
  TOPICS:{
          topics:arrayOf(topic)
        },
  GROUPS:{
          groups:arrayOf(group)
        },
  CONTENTS:{
          contents:arrayOf(content)
        }

  }

export const CALL_API = Symbol('Call API')

export default store => next => action => {

  const callAPI = action[CALL_API]
  //console.log(action);
  if (typeof callAPI === 'undefined') {
    //console.log('callAPI undefined');
    return next(action)
  }

  let { endpoint } = callAPI
  let {httpmethod}=callAPI

  const { schema, types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (httpmethod==='get'&&!schema) {
    //console.log(callAPI);
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    //console.log('action:'+action);
    //console.log('action data:'+data);
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]

    //console.log('finalAction:'+finalAction);
    return finalAction
  }

 function pushToFeature() {
   browserHistory.push('/feature');
 }
  const [ requestType, successType, failureType ] = types

  next(actionWith({ type: requestType }))


  if(httpmethod==='get'){
    //console.log("calling get:" +schema);
    return callApi(endpoint, schema).then(
      response => {
        //console.log('response:'+response.result.topics);
      next(
          actionWith({
          response,
          type: successType
        })
      )},
      error => next(actionWith({
        type: failureType,
        error: error.message || 'Something bad happened'
      }))
    )
  }
  if(httpmethod==='post'){
    return postApi(endpoint,{email:callAPI.email,password:callAPI.password})
            .then(response=>{
              //console.log('postApi');

              next(actionWith({response,type:successType}));
              pushToFeature();
            },
              error => next(actionWith({
                type: failureType,
                error: error.message || 'Something bad happened'
              }))
            )
  }
  if(httpmethod==='postContent'){
    //console.log(callAPI.body);
    return postApiContent(endpoint,callAPI.body,schema)
            .then(response=>{
              //console.log('post content response:'+response +' successType:'+successType);

              next(actionWith({response,type:successType}));

            },
              error => next(actionWith({
                type: failureType,
                error: error.message || 'Something bad happened'
              }))
            )
  }
}
