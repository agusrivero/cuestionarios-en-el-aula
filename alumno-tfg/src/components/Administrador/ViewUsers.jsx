import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import {getUsers} from '../../actions/user_actions';

class ViewUsers extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getUsers()
    }

    render() {
        var userList
        return(
            <div className="">
                <div>Users</div>
            </div>

        );
    }
}


ViewUsers.propTypes = {
    getUsers: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  login: state.login
});

export default connect(mapStateToProps, {getUsers})(withRouter(ViewUsers));