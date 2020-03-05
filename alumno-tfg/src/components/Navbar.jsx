import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import { logoutUser } from '../actions/login_action';


class Navbar extends Component {
    constructor(props){
        super(props);
      
        this.logout = this.logout.bind(this)
    }

   
    logout(){
        this.props.logoutUser();
    }

    render(){
       
        
        if(this.props.login.authenticated && this.props.login.user.isAdmin){
            return (
            <div className="mainScreen">
                <button onClick={this.logout}>Logout</button>
                <Link to="/admin">{this.props.login.user.username}</Link>
            </div>
        
            )
        }if(this.props.login.authenticated && !this.props.login.user.isAdmin){
            return (
            <div className="mainScreen">
                <button onClick={this.logout}>Logout</button>
            <Link to="/user">User</Link>
            </div>
        
            )
        }
        return (
        <div className="mainScreen">
            
        </div>
        
        )
    }

}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    login: state.login
//   errors: state.errors
});

export default connect(mapStateToProps, {logoutUser})(withRouter(Navbar));