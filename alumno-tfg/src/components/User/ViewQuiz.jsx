import React from 'react';
//import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
//import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import {getQuiz, deleteQuiz} from '../../actions/quiz_actions'
import {deleteQuestion} from '../../actions/question_actions'

class ViewQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            quizId: 0
        }
        //this.deleteQuizzes = this.deleteQuizzes.bind(this);
        this.delQuestion = this.delQuestion.bind(this)
    }

    componentDidMount(){
        
        const id = this.props.match.params.id;
        this.props.getQuiz(id);
        console.log("Mi quiz: ", this.props.quiz)
        //this.props.getQuestions(id);
    }

    componentWillReceiveProps(nextProps){
        const id = this.props.match.params.id;
        nextProps.getQuiz(id);
        
    }

    /*deleteQuizzes(id, e){
        e.preventDefault();
        console.log(id)
        this.props.deleteQuiz(id);
        this.props.history.push('/user/quizzes/'+this.props.login.user.id);
    }*/

    delQuestion(id,e){
        const quizId = this.props.match.params.id
        this.props.deleteQuestion(id, quizId);
        //console.log(id)
        //console.log(quizId)
    }

    render() {
        //console.log("Mis preguntas: ",this.props.questions)
        const pr = this.props.questions.preguntas;
        //const pr = this.props.quiz.quiz.pregunta;
        //const pr = this.state.preguntas;
        const preguntasList = pr.map((pregunta) => {
            const editLink = '/edit/question/'+pregunta.id
            return(
                <li key={pregunta.id}>
                    {pregunta.question}
                    <ul>
                        <li>{pregunta.answer_correct}</li>
                        <li>{pregunta.answer_incorrect1}</li>
                        <li>{pregunta.answer_incorrect2}</li>
                        <li>{pregunta.answer_incorrect3}</li>
                    </ul>
                    <button onClick={(e) => this.delQuestion(pregunta.id, e)}>Delete</button>
                    <Link to={editLink}>Edit</Link>
                </li>
                
            )
        });
        const addLink = '/quiz/'+this.props.match.params.id+'/add'
        const playLink = '/quiz/'+this.props.match.params.id+'/play'
        return(
            <div className="">
                <div>Quiz: {this.props.quiz.quiz.name}</div>
                <ul>{preguntasList}</ul>
                <Link to={addLink}>Add Question</Link>
                <Link to={playLink}>Play</Link>
            </div>

        );
    }
}


ViewQuiz.propTypes = {
    getQuiz: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    //deleteQuiz: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {getQuiz, deleteQuestion})(withRouter(ViewQuiz));