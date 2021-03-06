import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App'
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import GroupList from './components/groupList';
import TopicList from './components/topicList';
import Content from './components/content';

const store = configureStore()
store.dispatch({  type: 'signin' });

render(
  <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Welcome} />
          <Route path="signin" component={Signin} />
          <Route path="signout" component={Signout} />
          <Route path="signup" component={Signup} />
          <Route path="feature" component={RequireAuth(Feature)} />
          <Route path="groupList" component={GroupList} />
          <Route path="topicList" component={TopicList} />
          <Route path="content" component={Content} />
        </Route>
      </Router>
  </Provider>,
  document.getElementById('root')
)
