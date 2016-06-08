import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {loadContent} from '../actions'
import ComposeContent from './composeContent'




class Content extends Component {
  constructor(props) {
    super(props)
    this.renderList=this.renderList.bind(this)
  }
  componentWillMount() {
  //console.log('loading topic list');
  //this.props.loadTopicLists(this.props.selectGroup);
  }
  renderList(items,topics,groupId){

    if(!items){
      return
    }else{
      return items.map(item=>{
        return (
          <li key={item}>
              {topics[item].content}
          </li>
        )
      })
    }

  }
  render() {
    return (
      <div>
        <h5>Posts</h5>
        <ul>
          {this.renderList(this.props.contentids,this.props.entities.contents)}
        </ul>
        <ComposeContent></ComposeContent>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { contentids:state.contents.ids,
          entities:state.entities,
          selectGroup:state.SelectedGroup.Group,
          selectTopic:state.SelectedTopic.Topic
   };
}
export default connect(mapStateToProps)(Content);
