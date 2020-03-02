import { Provider } from 'react-redux';

import {history} from '../helpers/history';

import{setUser} from '../actions/login_action';

import store from './Store';
import React from 'react';
import Login from '../components/Login';
import AdminView from '../components/Administrador/AdminView';
import UserView from '../components/User/UserView';
import EditView from '../components/EditView';
import NewUser from '../components/Administrador/NewUser';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

if(localStorage.session){
    let session = JSON.parse(localStorage.session);
    store.dispatch(setUser(session.user))
}
// localStorage.clear();


export default class App extends React.Component{
    constructor(props) {
        super(props);
        // this.initialState = {
        //     user: {},
        //     // logged: false
        // };
        // this.store = this.configureStore();
        // // history.listen((location, action) => {
        // //     // clear alert on location change
        // //     this.props.clearAlerts();
        // // });
    }

    render() {
        return(
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/admin" component={AdminView}/>
                        <Route exact path="/user" component={UserView}/>
                        <Route exact path="/edit" component={EditView}/>
                        <Route exact path="/admin/new" component={NewUser}/>
                    </Switch>
                </Router>
                
            </Provider>
        );
    }
}

