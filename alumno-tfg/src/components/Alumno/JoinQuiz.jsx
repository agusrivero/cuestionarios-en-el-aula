import React from 'react';

import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';

import axios from 'axios'

import {connect} from 'react-redux';

//import {joinQuiz} from '../../actions/quiz_actions'


class JoinQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            accessId: 0,
            username: "",
            submited: false,
            started: false,
            error: ""
        }
        this.checkStartedQuiz = this.checkStartedQuiz.bind(this)
    }

    componentDidMount(){
        console.log("Create Quiz", this.props.login.user)
        this.setState({
            owner: this.props.login.user.id
        })
    }

    checkStartedQuiz(e){
        e.preventDefault();
        const accessId = this.state.accessId;
        axios.get('/quiz/started'+accessId)
        .then(res => {
            if(res.data){
                this.setState({
                    started: true
                })
            }if(!res.data){
                this.setState({
                    error: "El Quiz indicado no está disponible"
                })
            }
        })
        /*this.props.joinQuiz(accessId)*/
        
    }

    render() {
        if(!this.state.started){
            return(
            <div className="quizId">
                <div>Join Quiz</div>
                <div>{this.state.error}</div>
                <form onSubmit={this.joinQuiz}>
                    <input type="text" onChange={(e) => this.setState({accessId: e.target.value})}/>
                    <input type="submit" value="Join"/>
                </form>
            </div>
            );
        }else {
            return(
                <div>Empezado</div>
            )
        }
        
           
                
            
        
    }
}


JoinQuiz.propTypes = {
    //joinQuiz: PropTypes.func.isRequired,
    quiz: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    quiz: state.quiz,
    login: state.login,
//   errors: state.errors
});

export default connect(mapStateToProps)(withRouter(JoinQuiz));