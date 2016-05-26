import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';

const store = configureStore()


render(
  <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Welcome} />
          <Route path="signin" component={Signin} />
        </Route>
      </Router>
  </Provider>,
  document.getElementById('root')
)
