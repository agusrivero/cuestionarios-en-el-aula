import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import {getQuestion, editQuestion} from '../../actions/question_actions';

class EditQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question: "",
            correct_answer: "",
            answer2: "",
            answer3: "",
            answer4: ""
        }
        this.edit = this.edit.bind(this);
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.getQuestion(id)
        
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            question: nextProps.questions.pregunta.question,
            correct_answer: nextProps.questions.pregunta.answer_correct,
            answer2: nextProps.questions.pregunta.answer_incorrect1,
            answer3: nextProps.questions.pregunta.answer_incorrect2,
            answer4: nextProps.questions.pregunta.answer_incorrect3
        })
    }

    edit(e){
        e.preventDefault();
        const id = this.props.match.params.id;
        const question = this.state
        this.props.editQuestion(id, question, this.props.history) 
    }
    render() {
        return(
            <div className="">
                <div>Edit Question</div>
                <div>{this.props.match.params.id}</div>
                <form onSubmit={this.edit}>
                    <label>Question:</label>
                    <input type="text" onChange={(e) => this.setState({question: e.target.value})} value={this.state.question}/>
                    <label>Correct Answer:</label>
                    <input type="text" onChange={(e) => this.setState({correct_answer: e.target.value})} value={this.state.correct_answer}/>
                    <label>Answer 2:</label>
                    <input type="text" onChange={(e) => this.setState({answer2: e.target.value})} value={this.state.answer2}/>
                    <label>Answer 3:</label>
                    <input type="text" onChange={(e) => this.setState({answer3: e.target.value})} value={this.state.answer3}/>
                    <label>Answer 4:</label>
                    <input type="text" onChange={(e) => this.setState({answer4: e.target.value})} value={this.state.answer4}/>
                    <input type="submit" value="Edit"/>
                </form>
            </div>

        );
    }
}


EditQuestion.propTypes = {
    getQuestion: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired,
    quiz: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    match: state.match,
    questions: state.questions,
    quiz: state.quiz,
    login: state.login
});

export default connect(mapStateToProps, {getQuestion, editQuestion})(withRouter(EditQuestion));