import React from 'react';

import PropTypes from 'prop-types'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import { logoutUser } from '../../actions/login_action';

class UserView extends React.Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this)
    }

    logout(){
        this.props.logoutUser();
        
    }
    
    render() {
        return(
            <div className="quizId">
                <div>User View</div>
                <button onClick={this.logout}>Logout</button>
            </div>
           
                
            
        );
    }
}


UserView.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  login: state.login,
//   errors: state.errors
});

export default connect(mapStateToProps, {logoutUser})(withRouter(UserView));