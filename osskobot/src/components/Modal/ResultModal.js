import React, { useEffect, useState } from "react";
import styled, {keyframes} from "styled-components";
import Correct from '../../assets/Correct.png';
import Wrong from '../../assets/Wrong.png';
import Modal from 'react-modal';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const correctAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const wrongAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const Result = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 10rem;
  color: ${({ isCorrect }) => (isCorrect ? 'green' : 'red')};
  animation: ${({ isCorrect }) => (isCorrect ? correctAnimation : wrongAnimation)} 0.6s ease-out;
  animation-fill-mode: forwards;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease-in;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  .correct {
    font-size: 500px;
    color: green;
    animation: ${correctAnimation} 1s ease-in-out;
  }

  .wrong {
    font-size: 500px;
    color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: ${wrongAnimation} 1s ease-in-out;
  }
`;

const CustomModal = styled(Modal)`
    user-select: none;
`;

const customStyles = {
    overlay: {
      backgroundColor: 'transparent',
    },
  };

const P = styled.p`
  font-family: 'Pretendard-Bold';
  font-size: 30px;
  margin: 0;
  margin-top: 40px;
  color: black;
`;

const Span = styled.span`
  color: #33b254;
`

function ResultModal({ isCorrect, answer }) {
    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        setTimeout(() => setIsOpen(false), 2000);
    }, []);
    return(
        <CustomModal
            isOpen={isOpen}
            ariaHideApp={false}
            style={customStyles}
        >
            <ModalContent>
                {isCorrect ? <div className="correct">
                    <img src={Correct} />
                </div> : <div className="wrong">
                    <img src={Wrong} />
                    <P>정답은 <Span>{answer}</Span>(이)에요</P>
                </div>}
            </ModalContent>
        </CustomModal>
    )
}

export default ResultModal;