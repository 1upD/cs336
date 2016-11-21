import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';

import '../css/base.css';

import CommentBox from './CommentBox.js'
import CommentEdit from './CommentEdit.js'

import { Router, Route, Redirect, browserHistory } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={CommentBox}/>
    <Route path="/:id" component={CommentEdit} />
  </Router>,
  document.getElementById('content')
);
