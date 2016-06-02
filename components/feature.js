import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadPost } from '../actions'
import GroupList from './groupList';

class Feature extends Component {

  render() {

    return (
      <div>
        <GroupList></GroupList>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { entities,topics,auth } = state
  return {
  }
}

export default connect(mapStateToProps,{loadPost})(Feature)
