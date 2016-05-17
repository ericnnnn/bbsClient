import fetch from 'isomorphic-fetch'
import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'


// const userSchema=new Schema('user',{
//   idAttribute:'id'
// })

// const groupSchema=new Schema('group',{
//   idAttribute:'id'
// })
//
// const titleSchema=new Schema('title',{
//   idAttribute:'id'
// })
//
// titleSchema.define({
//   owner:groupSchema,
//   //cont: arr
// })
//
// export const Schemas={
//   //USER:userSchema,
//   GROUP:groupSchema,
//   GROUP_ARRAY:arrayOf(groupSchema),
//   TITLE:titleSchema,
//   TITLE_ARRAY:arrayOf(titleSchema)
// }


// const article = new Schema('articles');
// const user = new Schema('users');
//
//
//
// article.define({
//   author: user,
//   contributors: arrayOf(user)
// });



const topic=new Schema('topics');
const groupSchema =new Schema('group');
const userSchema=new Schema('user');
 topic.define({
   group:groupSchema,
   user:userSchema
 });

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
      .then(json=>{
        const camelizedJson = camelizeKeys(json)
        //console.log(camelizedJson)
        dispatch(receivePosts(normalize(camelizedJson, {
                  topics:arrayOf(topic),

                  })))})
        // dispatch(receivePosts(json)}))
      .catch(e=>console.log(e))

  }
}
