import React from 'react';
import { AnswerObject } from '../App'
import {Questions, ButtonWrapper} from '../App.styles'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | null;
    questionNr: number;
    totalQuestions: number;
}

 const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions 
 }) => {
    
    return (
        <Questions>
            <p dangerouslySetInnerHTML={{__html: question}}/>
            <div>
                {answers.map((answer) => (
                    <ButtonWrapper
                        key={answer}
                        correct={userAnswer?.correctAnswer === answer}
                        userClicked={userAnswer?.answer === answer}>
                        <button disabled={!!userAnswer} onClick={callback} value={answer}>
                            <span dangerouslySetInnerHTML={{__html: answer}}/>
                        </button>
                    </ButtonWrapper>))}
            </div>
            <p className='number'>
                Question: {questionNr} / {totalQuestions}
            </p>
        
        </Questions>
    )
}

export default QuestionCard