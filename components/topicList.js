
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadTopicLists } from '../actions'
import { loadContent } from '../actions'




class TopicList extends Component {
  constructor(props) {
    super(props)
    this.renderList=this.renderList.bind(this)
  }
  componentWillMount() {
  console.log('loading topic list');
  //this.props.loadTopicLists(this.props.selectGroup);
  }
  renderList(items,topics,groupId){

    return items.map(item=>{
      return (
        <li key={item}
             onClick={()=>this.props.loadContent(item,groupId)
                     }
          >
            {topics[item].title}
        </li>
      )
    })
  }
  render() {
    return (
      <div>
        <ul>
        {this.renderList(this.props.topicids,this.props.entities.topics,this.props.selectGroup)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { topicids:state.topics.ids,
          entities:state.entities,
          selectGroup:state.SelectedGroup.Group
   };
}
export default connect(mapStateToProps, {loadTopicLists,loadContent})(TopicList);
