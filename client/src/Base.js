import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import App from './App';
import ReactNotifications from 'react-notifications-component';


import { loadUser } from './redux/actions/auth';

class Base extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <ReactNotifications />
                    <Route component={App} />
                </Provider>
            </BrowserRouter>

        );
    }
}

export default Base;