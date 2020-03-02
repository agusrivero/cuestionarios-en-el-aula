import React from 'react';


export default class AnswerQuestion extends React.Component {
    constructor(props){
        super(props);
        this.aleatorio = this.init();
        this.answerQuestion = this.answerQuestion.bind(this);
       
    }

    init(){
        let aleatorio = [];
        let length = this.props.pregunta.answers.length;
        let mispreguntas = [];
        for (let i = 0; i<this.props.pregunta.answers.length; i++){
            mispreguntas.push(this.props.pregunta.answers[i]);
        }   
        while(aleatorio.length !== length){
            let rand = Math.floor(Math.random()* mispreguntas.length);
            aleatorio.push(mispreguntas[rand]);
            mispreguntas.splice(rand, 1);
        }
        return aleatorio;
    }

    answerQuestion(answer){
        if(answer === this.props.pregunta.answers[0]){
            console.log('great');
            this.aleatorio = this.init();
            this.props.answerClick();
        }else{
            console.log('bad')
        }
    }

    render() {
        var answers;
        answers = this.aleatorio.map((comp) => <button key={comp} onClick={(e) => this.answerQuestion(comp)}>{comp}</button>)
        return(
            <div className="answerQuiz">
                {answers}
            </div>
        );
    }
}