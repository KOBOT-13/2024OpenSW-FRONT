import styled from 'styled-components';
import { IoIosCheckboxOutline } from "react-icons/io";

const Div = styled.div`
    &.OwnMsgDiv{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    &.MsgDiv{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    &.MsgBox{
        display: flex;
        justify-content:center;
        align-items:center;
        margin-top: 11px;
    }
    &.Bubble{
        display: inline-block;
        padding: 9px;
        max-width: 580px;
        margin-right: ${(props) => props.$isOwn ? "30px" : "0px"};
        margin-left: ${(props) => props.$isOwn ? "0px" : "30px"};
        border-radius: 10px;
        background-color: ${(props) => props.$isOwn ? "#fff4ab" : "#f2f3f7"};
    }
    &.Voice-Box{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: 'Pretendard-Regular';
        font-size: 13px;
        color: rgba(0,0,0,0.5);
        margin-left: 30px;
        margin-top: 5px;
        margin-bottom: 11px;
        user-select: none;
        cursor: pointer;
    }
`;

const Span = styled.span`
    font-family: 'Pretendard-Medium';
    font-size: 11px;
    color: #9a9ba7;
    padding: 5px;
    order: ${(props) => props.$isOwn ? 0 : 1};
    align-self: self-end;
`;

const ChatMsg = ({ message, time, isOwnMessage, playAudio }) => { 
    return (
        <Div className={isOwnMessage ? 'OwnMsgDiv' : 'MsgDiv'}>
            <Div className='MsgBox'>
                <Span $isOwn={isOwnMessage}>{time}</Span>
                <Div className='Bubble' $isOwn={isOwnMessage}>
                    {message}
                </Div>
            </Div>
            {!isOwnMessage && playAudio && (
                <Div className='Voice-Box' onClick={playAudio}>
                    <IoIosCheckboxOutline />
                    음성으로 다시 듣기
                </Div>
            )}
        </Div>
    );
}

export default ChatMsg;