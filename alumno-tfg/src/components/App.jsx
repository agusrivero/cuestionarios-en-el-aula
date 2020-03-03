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
import Navbar from './Navbar';
import RutaPrivada from './comun/RutaPrivada';
import ViewUsers from './Administrador/ViewUsers';

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
                  <Navbar/>
                  <Route exact path="/" component={Login}/>
                    <Switch>
                        <RutaPrivada exact path="/admin" component={AdminView}/>
                        <RutaPrivada exact path="/user" component={UserView}/>
                        <RutaPrivada exact path="/edit" component={EditView}/>
                        <RutaPrivada exact path="/admin/new" component={NewUser}/>
                        <RutaPrivada extact path="/users" component={ViewUsers}/>
                    </Switch>
                </Router>
                
            </Provider>
        );
    }
}

