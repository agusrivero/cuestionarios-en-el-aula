import React from 'react';
//import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
//import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import {getQuizzes, deleteQuiz} from '../../actions/quiz_actions'

class ViewQuizzes extends React.Component {
    constructor(props){
        super(props);
        this.deleteQuizzes = this.deleteQuizzes.bind(this);
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.getQuizzes(id);
    }

    componentWillReceiveProps(nextProps){
        const id = this.props.match.params.id;
        nextProps.getQuizzes(id);
    }

    deleteQuizzes(id, e){
        e.preventDefault();
        console.log(id)
        this.props.deleteQuiz(id);
        this.props.history.push('/user/quizzes/'+this.props.login.user.id);
    }

    render() {
        const quizzes = this.props.quiz.quizzes;
        const quizList = quizzes.map((quiz) => {
            const viewLink = '/view/quiz/'+quiz.id
            return(
                <li key={quiz.id}>
                    {quiz.name}
                    <button onClick={(e) => this.deleteQuizzes(quiz.id, e)}>Delete</button>
                    <Link to={viewLink}>See</Link>
                </li>
                
            )
        });

        return(
            <div className="">
                <div>Quizzes</div>
                <ul>{quizList}</ul>
            </div>

        );
    }
}


ViewQuizzes.propTypes = {
    getQuizzes: PropTypes.func.isRequired,
    deleteQuiz: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    quiz: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    match: state.match,
    quiz: state.quiz,
    login: state.login
});

export default connect(mapStateToProps, {getQuizzes, deleteQuiz})(withRouter(ViewQuizzes));