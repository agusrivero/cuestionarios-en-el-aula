import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import { logoutUser } from '../../actions/login_action';

class AdminView extends React.Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this)
    }


    logout(){
        this.props.logoutUser();
        this.props.history.push('/')
    }

    componentDidMount(){
        // console.log(this.props.login)
    }

    render() {
        return(
            <div className="hola">
                <div>Admin View</div>
                <Link to="/edit">Edit</Link>
                <Link to="/admin/new">Create User</Link>
                <button onClick={this.logout}></button>
            </div>

        );
    }
}


AdminView.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  login: state.login,
//   errors: state.errors
});

export default connect(mapStateToProps, {logoutUser})(withRouter(AdminView));