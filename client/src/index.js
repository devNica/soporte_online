import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Base from './Base';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Base />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
