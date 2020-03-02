import { Provider } from 'react-redux';
import GlobalState from './reducers';
import { createStore } from 'redux';
import {history} from '../helpers/history';

import React from 'react';
import Login from '../components/Login';
// import PlayQuiz from '../components/Mierda/PlayQuiz';
import AdminView from '../components/Administrador/AdminView';
import UserView from '../components/User/UserView';
import EditView from '../components/EditView';
import NewUser from '../components/Administrador/NewUser';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

if(localStorage.session){
    let session = JSON.parse(localStorage.session);
    
}


export default class ReduxProvider extends React.Component{
    constructor(props) {
        super(props);
        this.initialState = {
            user: {},
            // logged: false
        };
        this.store = this.configureStore();
        // history.listen((location, action) => {
        //     // clear alert on location change
        //     this.props.clearAlerts();
        // });
    }

    render() {
        return(
            <Provider store={this.store}>
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

    

    configureStore() {
        return createStore(GlobalState, this.initialState)
    }
}

