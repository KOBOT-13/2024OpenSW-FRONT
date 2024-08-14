import styled from "styled-components";
import ChatImage from '../assets/ChatImage.png'

export const Div = styled.div`
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
    }
`;

export const ChatDiv = styled.div`
    position: relative;
    background-image: url(${ChatImage});
    width: 911px;
    height: 206px;
`;

export const Image = styled.img``;

export const Speech = styled.p`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Pretendard-Medium';
    font-size: 25px;
    margin: 0;
    margin-left: 10px; 
    max-width: 90%; /* 최대 너비를 부모 요소에 맞추기 */
    overflow-wrap: break-word; /* 단어 단위로 줄바꿈 */
    white-space: normal; /* 공백을 여러 줄로 표시 */
    text-align: center; /* 중앙 정렬 */
`;