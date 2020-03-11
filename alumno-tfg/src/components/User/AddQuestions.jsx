import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import {newQuestion} from '../../actions/question_actions';

class AddQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question: "",
            correct_answer: "",
            answer2: "",
            answer3: "",
            answer4: ""
        }
        this.addQuestion = this.addQuestion.bind(this);
    }

    addQuestion(e){
        e.preventDefault();
        const question = this.state
        this.props.newQuestion(this.props.quiz.quiz.id, question, this.props.history)  
    }
    render() {
        const numberQuestions = this.props.quiz.quiz.questionNumber;
        return(
            <div className="">
                <div>Create User</div>
                <div>{this.props.match.params.id}</div>
                <form onSubmit={this.addQuestion}>
                    <label>Question:</label>
                    <input type="text" onChange={(e) => this.setState({question: e.target.value})}/>
                    <label>Correct Answer:</label>
                    <input type="text" onChange={(e) => this.setState({correct_answer: e.target.value})}/>
                    <label>Answer 2:</label>
                    <input type="text" onChange={(e) => this.setState({answer2: e.target.value})}/>
                    <label>Answer 3:</label>
                    <input type="text" onChange={(e) => this.setState({answer3: e.target.value})}/>
                    <label>Answer 4:</label>
                    <input type="text" onChange={(e) => this.setState({answer4: e.target.value})}/>
                    <input type="submit" value="Add"/>
                </form>
            </div>

        );
    }
}


AddQuestion.propTypes = {
    newQuestion: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    quiz: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    match: state.match,
    quiz: state.quiz,
    login: state.login
});

export default connect(mapStateToProps, {newQuestion})(withRouter(AddQuestion));