import React from 'react';
//import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
//import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import {getQuiz, startQuiz} from '../../actions/quiz_actions'

class PlayQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quizName: "",
            accessId: 0,
            questions: [],
            alumnos: [],
            started: false
        }
        //this.deleteQuizzes = this.deleteQuizzes.bind(this);
        this.startQuiz = this.startQuiz.bind(this)
    }

    componentDidMount(){
        
        const id = this.props.match.params.id;
        this.props.getQuiz(id);
        this.props.startQuiz(id)
    }

    componentWillReceiveProps(nextProps){
        const id = this.props.match.params.id;
        nextProps.getQuiz(id);
        this.setState({
            quizName: nextProps.quiz.quiz.name,
            accessId: nextProps.quiz.quiz.accessId,
            questions: nextProps.questions.preguntas,
            alumnos: nextProps.quiz.quiz.alumnos
        })
        
    }

    startQuiz(){
        this.setState({
            started: true
        })
        
    }

    render() {
        const alumnos = this.state.alumnos;
        const alumnosList = alumnos.map((alumno) => {
            return(
                <li>{alumno.username}</li>
            )
        })
        if(!this.state.started){
            return(
                <div className="">
                    <div>Quiz: {this.state.quizName}</div>
                    <ul>{this.state.accessId}</ul>
                    <button onClick={this.startQuiz}>Start</button>
                    <ul>{alumnosList}</ul>
                </div>
    
            );
        }else{
            return(
                <div className="">
                    <div>QEmpezado</div>
                    
                </div>
    
            );
        }
        //console.log("Mis preguntas: ",this.props.questions)
        /*const pr = this.props.questions.preguntas;
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

        );*/
    }
}


PlayQuiz.propTypes = {
    getQuiz: PropTypes.func.isRequired,
    startQuiz: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {getQuiz, startQuiz})(withRouter(PlayQuiz));