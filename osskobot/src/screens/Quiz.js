import { useNavigate, useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Question from '../components/Quiz/Question';
import './Quiz.css';
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
              <ResultP className='first'>퀴즈 맞추기 완료!</ResultP>
              <ResultP className='second'>5문제 중 <Span>{score}문제</Span>를 맞았어요</ResultP>
              <ResultP className='third'>
                    {score === 0 ? "책을 더 꼼꼼히 읽고 퀴즈에 도전해봐요!"
                    : score === 1 ? `한 문제를 맞았어요! 책을 다시 읽어볼까요?`
                    : score === 2 ? '두 문제를 맞았어요! 다시 한 번 풀어볼까요?'
                    : score === 3 ? '세 문제를 맞았어요! 잘했어요!'
                    : score === 4 ? '네 문제를 맞았어요! 훌륭해요!'
                    : '모든 문제를 맞았어요! 최고에요!'
                    } 
              </ResultP>
            </Div>
            <Div className='Result-Btns'>
              <Button className='retry' onClick={retryQuiz}>다시 풀기</Button>
              <Button className='exit' onClick={goCommunity}>나가기</Button>
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