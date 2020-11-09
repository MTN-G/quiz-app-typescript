import React, {useEffect, useState} from 'react';
import QuestionCard from './components/QuestionCard'
import { QuestionState ,fetchQuizQuestions, difficulty } from './API'
import { GlobalStyle, Wrapper} from './App.styles'
import  { ipTorArray } from './torIps'
import publicIp from "public-ip";

const TOTAL_QUESTIONS = 10

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string
}

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)


  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    setNumber(0);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, 11, difficulty.EASY );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = answer === questions[number].correct_answer;
      if (correct) setScore(prev => prev + 1);
      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswer(prev => [...prev, answerObject]);
    }
  }

  const nextQuestion = async () => {
      if (number === TOTAL_QUESTIONS - 1) {
        setGameOver(true)
      } else { 
        setNumber(prev => prev + 1)
      }
  }

  useEffect(()=>{
    const checkifTor = async () => {
      const userIp = await publicIp.v4();
      if (ipTorArray.includes(userIp)) alert("U R Tor User!")
    }
      checkifTor()
  },[])

  return (
    <>
    <GlobalStyle/>
    <Wrapper className="App">
      <h1>React Quiz</h1>
      {gameOver || userAnswer.length === TOTAL_QUESTIONS ?
      <button className='start' onClick={startTrivia}>Start</button>
      : null
      }
      {!gameOver?  <p className='score'>Score: {score}</p> : null}
      {loading? <p>Loading Question...</p> : null}
      {!loading && !gameOver ? 
      <QuestionCard 
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswer[number] || null}
        callback={checkAnswer}/>
      : null}
      {!loading && !gameOver && userAnswer.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ?  
      <button className='next' onClick={nextQuestion}>next</button> : null }
    </Wrapper>
</>
  );
}

export default App;
