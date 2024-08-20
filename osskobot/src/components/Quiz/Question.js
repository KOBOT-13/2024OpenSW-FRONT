import React, { useEffect, useState } from 'react';
import './Question.css'; // 추가된 CSS 파일 import
import styled from 'styled-components';
import ChatImage from '../../assets/ChatImage.png';
import Chat from '../../screens/Chat';

const Div = styled.div`
  &.Question-Box{
    display:flex;
  }
  &.Question-Container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &.Options{
    margin-top: 83px;
    display: grid;
    grid-template-columns: repeat(2, 448px);
    grid-template-rows: repeat(2, 178px);
    place-items: center;
  }
`;

const ChatDiv = styled.div`
    position: relative;
    background-image: url(${ChatImage});
    width: 911px;
    height: 206px;
`;

const Image = styled.img`
    width: 214px;
    height: 214px;
`;
const QuestionP = styled.p`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Pretendard-Bold';
  font-size: 27px;
  margin: 0;
  margin-left: 10px; 
  max-width: 90%; /* 최대 너비를 부모 요소에 맞추기 */
  overflow-wrap: break-word; /* 단어 단위로 줄바꿈 */
  white-space: normal; /* 공백을 여러 줄로 표시 */
  text-align: center; /* 중앙 정렬 */
`;

const Button = styled.button`
  width: 400px;
  height: 130px;
  background-color: ${(props) => {
    if (props.$curruntBtn && props.$clickBtn) return "#cff1d8"; // 정답 클릭 시
    if (!props.$curruntBtn && props.$clickBtn) return "#f4a4a4"; // 오답 클릭 시
    if (props.$showAnswer && props.$curruntBtn) return "#cff1d8"; // 오답 클릭 후 정답 표시
    return "#f2f3f7"; // 기본 배경색
  }};
  font-family: 'Pretendard-Bold';
  font-size: 30px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.5);
  &:hover {
    background-color: #e0e0e0; // 호버 시 색상
  }
`;

const Question = ({character, data, onAnswer, showAnswer, isCorrect, handleNextQuestion }) => {
  const [clickBtn, setClickBtn] = useState(undefined);
  useEffect(() => {
    if (showAnswer) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 2000); 
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    }
  }, [showAnswer]);

  return (
    <Div className='Question-Container'>
      <Div className='Question-Box'>
        <Image src={character.character_image} />
        <ChatDiv>
          <QuestionP>{data.question}</QuestionP>
        </ChatDiv>
      </Div>
      <Div className='Options'>
        {data.options.map((option, index) => {
          return <Button
            key={index}
            onClick={() => {setClickBtn(option);onAnswer(option)}}
            $curruntBtn={(option === data.answer)}
            $clickBtn={option === clickBtn}
            $showAnswer={showAnswer}
          >
            {index + 1}. {option}
          </Button>
        })}
      </Div>
    </Div>
    // <div className="question-container">
    //   <div className="question-box">
    //     <h2>{data.question}</h2>
    //   </div>
    //   <div className="options">
    //     {data.options.map((option, index) => (
    //       <button 
    //         key={index} 
    //         onClick={() => onAnswer(option)}
    //         className="option-button"
    //       >
    //         {index + 1}. {option}
    //       </button>
    //     ))}
    //   </div>
    //   {showAnswer && (
    //     <div className="answer-box">
    //       <p>정답: {data.answer}</p>
    //     </div>
    //   )}
    //   {isCorrect && (
    //     <><div className="correct-box">
    //       <p>정답을 맞췄습니다!</p>
    //     </div><div>
    //         <p>2초뒤에 화면이 넘어갑니다</p>
    //       </div></> 
    //   )}
    // </div>
  );
};

export default Question;
