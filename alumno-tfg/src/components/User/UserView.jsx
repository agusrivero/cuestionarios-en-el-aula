import React from 'react';

import PropTypes from 'prop-types'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';


class UserView extends React.Component {
    /*constructor(props){
        super(props);
    }*/

    // componentDidMount(){
    //     if(!this.props.login.authenticated){
    //         this.props.history.push('/')
    //     }
    // }
    // componentWillReceiveProps(nextProps){
    //     if(!nextProps.login.authenticated){
    //         this.props.history.push('/');
    //         }
            
    //     }

    render() {
        return(
            <div className="quizId">
                <div>User View</div>
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