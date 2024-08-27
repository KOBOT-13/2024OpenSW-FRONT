import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChatImage from '../../assets/ChatImage.png';

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
    margin-top: 24px;
    display: flex;
    gap: 15px;
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
  width: 230px;
  height: 73px;
  background-color: ${(props) => {
    if (props.$curruntBtn && props.$clickBtn) return "#cff1d8"; // 정답 클릭 시
    if (!props.$curruntBtn && props.$clickBtn) return "#f4a4a4"; // 오답 클릭 시
    if (props.$showAnswer && props.$curruntBtn) return "#cff1d8"; // 오답 클릭 후 정답 표시
    return "#f2f3f7"; // 기본 배경색
  }};
  font-family: 'Pretendard-Bold';
  font-size: 20px;
  color: #3063d2;
  border-radius: 10px;
  border: 1px solid #3063d2;
  background-color: #f5f7fd;
  &:hover {
    background-color: #dbe4ff; // 호버 시 색상
    transition: background-color 0.3s;
  }
`;

const Question = ({ character, data, onAnswer, showAnswer, isCorrect, handleNextQuestion }) => {
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
            onClick={() => { setClickBtn(option); onAnswer(option) }}
            $curruntBtn={(option === data.answer)}
            $clickBtn={option === clickBtn}
            $showAnswer={showAnswer}
          >
            {index + 1}. {option}
          </Button>
        })}
      </Div>
    </Div>
  );
};

export default Question;
