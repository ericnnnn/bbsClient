
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { loadGroupLists } from '../actions'
import {selectGroupWithDispatch} from '../actions'
import { loadTopicLists } from '../actions'
import { browserHistory } from 'react-router'

class GroupList extends Component {
  constructor(props) {
    super(props)
    this.renderList=this.renderList.bind(this)
  }
  componentWillMount() {
  //console.log('loading group list');
  this.props.loadGroupLists();
  }
  renderList(items,topics){

    return items.map(item=>{
      return (
        <li key={item}
            onClick={()=>{
                    this.props.selectGroupWithDispatch(item)
                    browserHistory.push('/TopicList');
                    }}
          >
            {topics[item].title}
        </li>
      )
    })
  }
  render() {
    return (
      <div>
        <h5>Groups</h5>
        <ul>
        {this.renderList(this.props.groupids,this.props.entities.groups)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { groupids:state.groups.ids,
          entities:state.entities
   };
}
export default connect(mapStateToProps, {loadGroupLists,selectGroupWithDispatch,loadTopicLists})(GroupList);
