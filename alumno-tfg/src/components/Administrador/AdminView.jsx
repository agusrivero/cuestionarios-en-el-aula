import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
//import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';


class AdminView extends React.Component {
    constructor(props){
        super(props);
    }


    render() {
        let editLink = "/edit/"+this.props.login.user.id;
        return(
            <div className="hola">
                <div>Admin View</div>
                <Link to={editLink}>Edit User</Link>
                <Link to="/admin/new">Create User</Link>
                <Link to="/users">View Users</Link>
            </div>

        );
    }
}


AdminView.propTypes = {
    login: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  login: state.login,
//   errors: state.errors
});

export default connect(mapStateToProps)(withRouter(AdminView));