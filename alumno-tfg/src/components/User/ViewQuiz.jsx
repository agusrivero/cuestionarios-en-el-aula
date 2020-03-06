import React from 'react';
//import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
//import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import {getQuiz, deleteQuiz} from '../../actions/quiz_actions'
import {getQuestions} from '../../actions/question_actions'

class ViewQuiz extends React.Component {
    constructor(props){
        super(props);
        //this.deleteQuizzes = this.deleteQuizzes.bind(this);
    }

    componentDidMount(){
        
        const id = this.props.match.params.id;
        this.props.getQuiz(id);
        
        //this.props.getQuestions(id);
    }

    /*componentWillReceiveProps(nextProps){
        const id = this.props.match.params.id;
        nextProps.getQuizzes(id);
    }

    /*deleteQuizzes(id, e){
        e.preventDefault();
        console.log(id)
        this.props.deleteQuiz(id);
        this.props.history.push('/user/quizzes/'+this.props.login.user.id);
    }*/

    render() {
        console.log("Mis preguntas: ",this.props.questions)
        const pr = this.props.questions.preguntas;
        const preguntasList = pr.map((pregunta) => {
            return(
                <li key={pregunta.id}>
                    {pregunta.question}
                    <ul>
                        <li>{pregunta.answer_correct}</li>
                        <li>{pregunta.answer_incorrect1}</li>
                        <li>{pregunta.answer_incorrect2}</li>
                        <li>{pregunta.answer_incorrect3}</li>
                    </ul>
                    
                </li>
                
            )
        });

        return(
            <div className="">
                <div>Quiz</div>
                <ul>{preguntasList}</ul>
            </div>

        );
    }
}


ViewQuiz.propTypes = {
    getQuiz: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {getQuiz})(withRouter(ViewQuiz));