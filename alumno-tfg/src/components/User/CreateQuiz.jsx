import React from 'react';

import PropTypes from 'prop-types'
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import {createQuiz} from '../../actions/quiz_actions'


class CreateQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quiz: "",
            owner: ""
        }
        this.createQuiz = this.createQuiz.bind(this)
    }

    componentDidMount(){
        console.log("Create Quiz", this.props.login.user)
        this.setState({
            owner: this.props.login.user.id
        })
    }

    createQuiz(e){
        e.preventDefault();
        const quizName = this.state.quiz;
        const owner = this.state.owner;
        this.props.createQuiz(quizName, owner)
    }

    render() {
        
        return(
            <div className="quizId">
                <div>Create Quiz</div>
                <form onSubmit={this.createQuiz}>
                    <label>Quiz name:</label>
                    <input type="text" onChange={(e) => this.setState({quiz: e.target.value})}/>
                    <input type="submit" value="Create"/>
                </form>
            </div>
           
                
            
        );
    }
}


CreateQuiz.propTypes = {
    createQuiz: PropTypes.func.isRequired,
    quiz: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    quiz: state.quiz,
    login: state.login,
//   errors: state.errors
});

export default connect(mapStateToProps, {createQuiz})(withRouter(CreateQuiz));