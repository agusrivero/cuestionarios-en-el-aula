import React from 'react';


export default class JoinQuiz extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className="quizId">
                <div>Join Quiz</div>
                <input type="number" onChange={(e) => {this.props.onQuizId(e.target.value)}}/>
            </div>
        );
    }
}