import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadPost } from '../actions'

class App extends Component {
   constructor(props) {
     super(props)
   }

  componentDidMount(){
    // const {dispatch}=this.props
    // dispatch(fetchPosts())
    console.log('test');
    this.props.loadPost()
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
    const {entities}=this.props
    return (
      <div>
          <ul>
            {
              //entities
              //state
               //this.renderList(posts.items)
               //<li>{posts.items.entities.group['1'].title}</li>
               //posts.items.result.topics.map(t=>{return (<li>posts.items.entities.topics[t].title</li>)})
              // posts.items.result.topics.map(id=>{return (<li>{posts.items.entities.group[posts.items.entities.topics[id].group].title}  {posts.items.entities.topics[id].title}</li>)})
            }
          </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { entities } = state
  return {
    entities
  }
}

export default connect(mapStateToProps,{loadPost})(App)
