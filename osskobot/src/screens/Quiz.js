import { useNavigate, useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Question from '../components/Quiz/Question';
import './Quiz.css'; // 추가된 CSS 파일 import
import { privateAxios } from '../services/axiosConfig';
import postReadBook from '../services/postReadBook';
import { Div, Span, Button, ResultP } from './QuizStyled';
import ChatHeader from '../components/Header/ChatHeader';
import ResultModal from '../components/Modal/ResultModal';

const Quiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizdata] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const bookId = Number(useParams().id);
  const { state } = useLocation();
  const { cover_image, title } = state;
  const [characters, setCharacters] = useState(
    { 0: { id: 0, character_image: "" } },
  );


  useEffect(() => {
    const getQuizzes = async () => {
      privateAxios.get(`quizzes/book_id_quizzes/${bookId}/`)
        .then((response) => {
          setQuizdata(response.data);
          setIsStart(true);
        }).catch((error) => {
          console.log(error);
        })
    }
    getQuizzes();
  }, []);

  useEffect(() => {
    privateAxios.get(`books/${bookId}/characters/`)
      .then((response) => {
        setCharacters(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAnswer = (selectedOption) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    if (selectedOption === quizData[currentQuestionIndex].answer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setIsCorrect(false);
    setIsAnswered(false);
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
      setIsStart(false);
      sendScore(); // 퀴즈가 끝났을 때 점수를 서버에 전송
      postReadBook(bookId)
    }
  };

  const retryQuiz = () => {
    setCurrentQuestionIndex(1); // 첫 번째 질문으로 리셋
    setScore(0); // 점수 초기화
    setShowResult(false); // 결과 페이지 숨기기
    setShowAnswer(false); // 답변 표시 숨기기
    setIsCorrect(false); // 정답 여부 초기화
    setIsAnswered(false);
    setIsStart(true);
  };

  const goCommunity = () => {
    navigate(`/bookclick/${bookId}`);
  };

  // 점수를 서버에 전송하는 함수
  const sendScore = () => {
    privateAxios.post(`mypages/quizRecord/`,
      {
        "score": score,
        "book": bookId
      },
    )
      .then(response => {
        console.log("Score sent successfully:", response.data);
      })
      .catch(error => {
        console.error("Error sending score:", error);
      });
  };


  return (
    <Div className='MainContainer'>
      <ChatHeader cover_image={cover_image} title={title} />
      <Div className='Mid'>
        {isStart ? <Question
          character={characters[0]}
          data={quizData[currentQuestionIndex]}
          onAnswer={handleAnswer}
          showAnswer={showAnswer}
          isCorrect={isCorrect}
          handleNextQuestion={handleNextQuestion}
        /> : showResult ?
          <Div>
            <Div className='Result'>
              <ResultP className='first'>🎉 퀴즈 맞추기 완료! 🎉</ResultP>
              <ResultP className='second'>5문제 중 <Span>{score}문제</Span>를 맞았어요</ResultP>
              {score > 3 ? <ResultP className='third'>훌륭해요! 독서를 열심히 했군요!</ResultP> : <ResultP className='third'>다시해볼까? 랄랄랄라라</ResultP>}
            </Div>
            <Div className='Result-Btns'>
              <Button className='retry' onClick={retryQuiz}>다시 시도하기</Button>
              <Button className='exit' onClick={goCommunity}>결과 공유하기</Button>
            </Div>
          </Div> 
          : null
        }
      </Div>
      <Div>
        {showAnswer && !showResult && (
          <ResultModal isCorrect={isCorrect} answer={quizData[currentQuestionIndex].answer} />
        )}
      </Div>
    </Div>
  );
};

export default Quiz;