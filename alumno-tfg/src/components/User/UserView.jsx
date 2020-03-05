import React from 'react';

import PropTypes from 'prop-types'
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';

import {connect} from 'react-redux';


class UserView extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const editLink = "/edit/"+this.props.login.user.id
        const quizzesLink = "/user/quizzes/"+this.props.login.user.id
        return(
            
            <div className="quizId">
                <div>User View</div>
                <Link to={editLink}>Edit User</Link>
                <Link to="/new/quiz">Create Quiz</Link>
                <Link to={quizzesLink}>View Quizzes</Link>
            </div>
           
                
            
        );
    }
}


UserView.propTypes = {
    login: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  login: state.login,
//   errors: state.errors
});

export default connect(mapStateToProps)(withRouter(UserView));