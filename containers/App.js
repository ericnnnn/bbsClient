import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

class App extends Component {
   constructor(props) {
     super(props)
   }

  componentDidMount(){
    const {dispatch}=this.props
    dispatch(fetchPosts())
  }

  renderList(items){
    return items.map((item)=>{
      return (
        <li key={item.id}>
            {item.title}
        </li>
      )
    })
  }
  render() {
    const {posts}=this.props
    return (
      <div>
          <ul>
            {
               //this.renderList(posts.items)
               //<li>{posts.items.entities.group['1'].title}</li>
               //posts.items.result.topics.map(t=>{return (<li>posts.items.entities.topics[t].title</li>)})
               posts.items.result.topics.map(id=>{return (<li>{posts.items.entities.group[posts.items.entities.topics[id].group].title}  {posts.items.entities.topics[id].title}</li>)})
            }
          </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { posts } = state
  return {
    posts
  }
}

export default connect(mapStateToProps)(App)
