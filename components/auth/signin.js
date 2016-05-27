import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
    this.props.signinUser({ email, password });
  }

  render() {
      const { handleSubmit, fields: { email, password }} = this.props;

    return(
      <div>
      <h3>Sign in page</h3>



            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <fieldset className="form-group">
                <label>Email:</label>
                <input {...email} className="form-control" />
              </fieldset>
              <fieldset className="form-group">
                <label>Password:</label>
                <input {...password} type="password" className="form-control" />
              </fieldset>
              
              <button action="submit" className="btn btn-primary">Sign in</button>
            </form>

      </div>
    )
  }
}



//export default Signin

function mapStateToProps(state) {
  return {  };
}
export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
