import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
// import { createPost } from '../actions/index';
import { Link } from 'react-router';
import {submitContent} from '../actions/index';

class ComposeContent extends Component {
  // static contextTypes = {
  //   router: PropTypes.object
  // };

  onSubmit(props) {
     this.props.submitContent(props);
     this.props.resetForm();
    //   .then(() => {
    //         this.context.router.push('/');
    //   });
  }

  render() {
    const { fields: { content }, handleSubmit,resetForm } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h5>Write something</h5>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>

      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
          selectedGroup:state.SelectedGroup.Group,
          selectedTopic:state.SelectedTopic.Topic
   };
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'ComposeContentForm',
  fields: [ 'content'],
  validate
}, mapStateToProps, {submitContent})(ComposeContent);
