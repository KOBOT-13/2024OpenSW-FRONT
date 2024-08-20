import styled from "styled-components";
import {ReactComponent as Star} from '../../assets/Star.svg';
import {ReactComponent as StarColor} from '../../assets/StarColor.svg';
import {format} from 'date-fns';
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
    width: 510px;
    height: 100px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 15px;
    display: flex;
    align-items: center;
    &:hover{
        background-color: rgba(0,0,0,0.2);
        transition: background-color 0.3s;
    }
    cursor: pointer;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
`;

const StarContainer = styled.div``;

const StarIcon = styled(Star)``;

const StarColorIcon = styled(StarColor)``;

const RetryContainer = styled.div`
    display: flex;
    align-self: flex-start;
    margin-top: 10px;
    margin-right: 16px;
    margin-left: auto;
    cursor: pointer;
`;

const RetryIcon = styled(FaArrowRotateLeft)`
    width: 12px;
    height: 12px;
`;

const Img = styled.img`
    border: 1px solid rgba(0,0,0,0.5);
    border-radius: 500px;
    width: 64px;
    height: 64px;
    margin-left: 20px;
`;

const Ul = styled.ul`
    user-select: none;
    display: flex;
    font-family: 'Pretendard-Regular';
    font-size: 15px;
    color: rgba(0,0,0,0.7);
    padding: 0;
    margin: 0;
`;

const P = styled.p`
    user-select: none;
    margin: 0;
    font-family: 'Pretendard-Regular';
    font-size: 10px;
    color: rgba(0,0,0,0.4);
    margin-left: 5px;
    &.retry{
        color: rgba(0,0,0,0.8);
    }
`;

const Li = styled.li`
    float: left;
    list-style: none;

    &::before {
    content: '|';
    margin-right: 10px;
    margin-left: 10px;
    }

    &:first-child::before {
    content: none;
    }

    &:last-child{
        color: rgba(0,0,0,0.4);
    }
`;

function QuizRecordComponent({charImg, quiz}){
    const navigate = useNavigate();
    const score = quiz.score;
    console.log(quiz);
    const ClickRetry = () => {
        navigate(`/bookclick/${quiz.book.id}/quiz`, {state:{cover_image:charImg, title:quiz.book.title}})
    }

    return(
        <Div>
            <Img src={charImg} />
            <InfoContainer>
                <Ul>
                    <Li key={1}>{quiz.book.title}</Li>
                    <Li key={2}>{format(quiz.completed_at, 'yy.MM.dd HH:mm')}</Li>                    
                </Ul>
                <StarContainer>
                    {[1,2,3,4,5].map((rating) => {
                        return rating <= score 
                        ? <StarColorIcon/>
                        : <StarIcon/>
                    })}
                </StarContainer>
                <P>
                    {score === 0 ? "책을 더 꼼꼼히 읽고 퀴즈에 도전해봐요!"
                    : score === 1 ? `한 문제를 맞았어요! 책을 다시 읽어볼까요?`
                    : score === 2 ? '두 문제를 맞았어요! 다시 한 번 풀어볼까요?'
                    : score === 3 ? '세 문제를 맞았어요! 잘했어요!'
                    : score === 4 ? '네 문제를 맞았어요! 훌륭해요!'
                    : '모든 문제를 맞았어요! 최고에요!'
                    } 
                </P>
            </InfoContainer>
            <RetryContainer onClick={ClickRetry}>
                <RetryIcon/>
                <P className="retry">다시 풀어보기</P>
            </RetryContainer>
        </Div>
    )
}

export default QuizRecordComponent;