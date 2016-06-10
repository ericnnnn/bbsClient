import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
// import { createPost } from '../actions/index';
import { Link } from 'react-router';
import {submitTopic} from '../actions/index';

class ComposeTopic extends Component {
  // static contextTypes = {
  //   router: PropTypes.object
  // };

  onSubmit(props) {

     this.props.submitTopic(props);
     this.props.resetForm();
    //   .then(() => {
    //         this.context.router.push('/');
    //   });
  }

  render() {
    const { fields: { topic }, handleSubmit,resetForm } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h5>Create Topic</h5>

        <div className={`form-group ${topic.touched && topic.invalid ? 'has-danger' : ''}`}>
          <label>Topic</label>
          <textarea className="form-control" {...topic} />
          <div className="text-help">
            {topic.touched ? topic.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>

      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.topic) {
    errors.topic = 'Enter topic';
  }

  return errors;
}

// function mapStateToProps(state) {
//   return {
//           selectedGroup:state.SelectedGroup.Group,
//           selectedTopic:state.SelectedTopic.Topic
//    };
// }

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'ComposeTopicForm',
  fields: [ 'topic'],
  validate
}, null, {submitTopic})(ComposeTopic);
