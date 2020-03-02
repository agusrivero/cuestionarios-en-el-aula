import React, {Component} from 'react';

import {connect} from 'react-redux';
import AnswerQuestion from './AnswerQuestion';

import {changeQuestion} from '../../redux/actions'


class PlayQuiz extends Component {
  constructor(props){
    super(props);
    this.answerClick = this.answerClick.bind(this);

  }

  answerClick(){
    this.props.dispatch(changeQuestion(this.props.currentQuestion));
  }

  render(){
    return (
      <div className="playScreen">
        <div>Welcome to Quiz {this.props.quizId}</div>
            <div>Pregunta: {this.props.quizzes[this.props.quizId].preguntas[this.props.currentQuestion].question}</div>
            <AnswerQuestion answerClick={this.answerClick} pregunta={this.props.quizzes[this.props.quizId].preguntas[this.props.currentQuestion]}/>
      </div>
      
    )
  }

}



function mapStateToProps(state) {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(PlayQuiz);