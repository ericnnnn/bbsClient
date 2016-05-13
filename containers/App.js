import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
 import { fetchPosts } from '../actions'
// import Picker from '../components/Picker'
// import Posts from '../components/Posts'


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
    const {posts }=this.props
    return (
      <div>
          <ul>
            {
               this.renderList(posts.items)
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
