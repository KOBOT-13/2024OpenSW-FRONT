import styled from "styled-components";
import ChatImage from '../assets/ChatImage.png'

export const Div = styled.div`
    &.Main{
        display: flex;
        flex-direction: column;
        align-items: normal;
    }
    &.Top{
        display:flex;
        justify-content: center;
    }
    &.Mid{
        margin-top: 74px;
        display:flex;
        flex-direction: column;
        align-items: center;
    }
    &.Char-Bubble{
        display:flex;
    }
    &.Voice-Box{
        width: 630px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: 'Pretendard-Regular';
        font-size: 17px;
        color: rgba(0,0,0,0.5);
        user-select: none;
        cursor: pointer;
    }
    &.Input-Box{
        display: flex;
        align-items:center;
        justify-content: center;
        gap: 12px;
        margin-top: 25px;
    }
    &.Chat-Box{
        width: 1160px;
        height: 500px;
        overflow-y: auto;
        border: 1px solid rgba(0,0,0,0.15);
        border-radius: 10px;
        align-self:center;
        margin-top: 25px;
        display: flex;
        flex-direction: column;
    }
`;

export const ChatDiv = styled.div`
    position: relative;
    background-image: url(${ChatImage});
    width: 911px;
    height: 206px;
`;

export const Image = styled.img`
    width: 214px;
    height: 214px;
`;

export const Speech = styled.p`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 800px;
    transform: translate(-50%, -50%);
    font-family: 'Pretendard-Medium';
    font-size: 25px;
    margin: 0;
    margin-left: 10px; 
    // max-width: 90%; /* 최대 너비를 부모 요소에 맞추기 */
    overflow-wrap: break-word; /* 단어 단위로 줄바꿈 */
    white-space: normal; /* 공백을 여러 줄로 표시 */
`;

export const Input = styled.input`
    width: 960px;
    height: 35px;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 10px;
    &:focus{
        outline: 0;
    }
    font-family: 'Pretendard-SemiBold';
    font-size: 18px;
    padding-left: 10px;
`;

export const Button = styled.button`
    &.Send{
        width: 73px;
        height: 40px;
        border: none;
        border-radius: 10px;
        background-color: black;
        color: white;
        font-family: 'Pretendard-Bold';
        font-size: 14px;
        padding: 0;
        &:hover{
            background-color: rgba(0,0,0,0.7);
            transition: background-color 0.3s;
        }
    }
    &.Mic{
        width: 50px;
        height: 40px;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 10px;
        background-color: white;
        &:hover{
            background-color: rgba(0,0,0,0.2);
            transition: background-color 0.3s;
        }
        display:flex;
        align-items:center;
        justify-content: center;
    }
`;