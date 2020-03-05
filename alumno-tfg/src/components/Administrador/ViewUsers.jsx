import React from 'react';
//import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
//import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import {getUsers, deleteUser} from '../../actions/user_actions';

class ViewUsers extends React.Component {
    constructor(props){
        super(props);
        this.deleteUser = this.deleteUser.bind(this)
    }

    componentDidMount(){
        this.props.getUsers()
    }

    deleteUser(id, e){
        //e.preventDefault();
        console.log(id)
        this.props.deleteUser(id, this.props.history);
        //this.props.history.push('/users');
        //window.location.reload();
    }

    render() {
        const users = this.props.user.users;
        console.log(users)
        const userList = users.map((user) => {
            const editLink = "/edit/"+user.id
            return(
                <li key={user.id}>
                    {user.username}
                    <button onClick={(e) => this.deleteUser(user.id, e)}>Click</button>
                    <Link to={editLink}>Edit</Link>
                </li>
                
            )
        });

        return(
            <div className="">
                <div>Users</div>
                <ul>{userList}</ul>
            </div>

        );
    }
}


ViewUsers.propTypes = {
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {getUsers, deleteUser})(withRouter(ViewUsers));