import styled from "styled-components";

export const Div = styled.div`
    position: absolute;
    width: 616px;
    &.BookName{
        left: 48px;
        top: 123px;
    }
    &.Author{
        left: 48px;
        top: 231px;
    }
    &.Publisher{
        left: 48px;
        top: 339px;
    }
    &.Character{
        left: 48px;
        top: 447px;
    }
`;

export const H1 = styled.h1`
    font-family: 'Pretendard-Bold';
    font-size: 30px;
    position: absolute;
    left: 48px;
    top: 35px;
    margin: 0;
`;

export const Button = styled.button`
    font-family: 'Pretendard-Medium';
    font-size: 33px;
    background: none;
    border: none;
    position: absolute;
    left: 669px;
    top: 35px;
`;

export const Apply = styled.button`
    font-family: 'Pretendard-Bold';
    font-size: 17px;
    color: white;
    background: black;
    border: none;
    position: absolute;
    left: 562px;
    top: 568px;
    border-radius: 10px;
    width: 107px;
    height: 40px;
    &:hover{
        background-color: rgba(0,0,0,0.5);
    }
`;