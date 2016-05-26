import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadPost } from '../actions'



//export default () => <div>Welcome to our slice of paradise</div>;

class Welcome extends Component {
   constructor(props) {
     super(props)
     this.renderList=this.renderList.bind(this)
   }
  componentWillMount(){
    this.props.loadPost();
  }
  componentDidMount(){
    // const {dispatch}=this.props
    // dispatch(fetchPosts())
    //console.log('test');
//    this.props.loadPost();


    const {entities,topics}=this.props


    console.log(entities)
  }



  renderList(items,topics){

    return items.map(item=>{
      return (
        <li key={item}>
            {topics[item].title}
        </li>
      )
    })
  }
  render() {

    const {entities,topics}=this.props

    //const items=[...topics]
    return (
      <div>
          <ul>
            {
              //entities
              //state
               //<li>{posts.items.entities.group['1'].title}</li>
               //posts.items.result.topics.map(t=>{return (<li>posts.items.entities.topics[t].title</li>)})
              // posts.items.result.topics.map(id=>{return (<li>{posts.items.entities.group[posts.items.entities.topics[id].group].title}  {posts.items.entities.topics[id].title}</li>)})
              //this.renderList(posts.items)
              //renderList(...entities.topics)
              //console.log(...entities.topics)

              this.renderList(topics.ids,entities.topics)


            }
          </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { entities,topics } = state
  return {
    entities,
    topics
  }
}

export default connect(mapStateToProps,{loadPost})(Welcome)
