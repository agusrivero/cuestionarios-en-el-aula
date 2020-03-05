import { Provider } from 'react-redux';

import history from '../history';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import{setUser} from '../actions/login_action';

import store from './Store';
import React from 'react';
import Login from '../components/Login';
import AdminView from '../components/Administrador/AdminView';
import UserView from '../components/User/UserView';
import EditUserAdmin from '../components/EditView';
import NewUser from '../components/Administrador/NewUser';
import Navbar from './Navbar';
import RutaPrivada from './comun/RutaPrivada';
import ViewUsers from './Administrador/ViewUsers';
import EditUser from './Administrador/EditUser';
import CreateQuiz from './User/CreateQuiz';
import ViewQuizzes from './User/ViewQuizzes';


if(localStorage.session){
    let session = JSON.parse(localStorage.session);
    store.dispatch(setUser(session.user))
}
// localStorage.clear();


export default class App extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render() {
        return(
            <Provider store={store}>
                <Router history={history}>
                  <Navbar/>
                  <Route exact path="/" component={Login}/>
                    <Switch>
                        <RutaPrivada exact path="/admin" component={AdminView}/>
                        <RutaPrivada exact path="/user" component={UserView}/>
                        <RutaPrivada exact path="/edit/:id" component={EditUser}/>
                        <RutaPrivada exact path="/admin/new" component={NewUser}/>
                        <RutaPrivada extact path="/users" component={ViewUsers}/>
                        <RutaPrivada extact path="/new/quiz" component={CreateQuiz}/>
                        <RutaPrivada extact path="/user/quizzes/:id" component={ViewQuizzes}/>
                    </Switch>
                </Router>
                
            </Provider>
        );
    }
}

