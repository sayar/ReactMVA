import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App';
import ConversationPane from './components/ConversationPane';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/conversation/:human" component={ConversationPane}></Route>
    </Route>
  </Router>
), document.getElementById('main'))
