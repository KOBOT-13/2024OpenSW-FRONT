import styled from "styled-components";

export const Div = styled.div`
    &.MainContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    &.Mid{
        margin-top: 73px;
        display: flex;
    }
    &.Result{
        width: 1160px;
        height: 324px;
        background-color: #f2f3f7;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }
    &.Result-Btns{
        margin-top: 15px;
        display: flex;
        justify-content: flex-end;
    }
`;

export const ResultP = styled.p`
    font-family: 'Pretendard-Bold';
    margin: 0;
    &.first{
        font-size: 35px;
        margin-top: 56px;
    }
    &.second{
        font-size: 50px;
        margin-top: 42px;
    }
    &.third{
        font-family: 'Pretendard-SemiBold';
        font-size: 30px;
        color: #646464;
        margin-top: 27px;
    }
`;

export const Span = styled.span`
    color: #33b254;
`;

export const Button = styled.button`
    font-family: 'Pretendard-Bold';
    font-size: 17px;
    border-radius: 10px;
    padding: 10px 24px 10px 24px;
    margin-left:10px;
    &.retry{
        border: 1px solid rgba(0,0,0,0.15);
        background-color: white;
        &:hover{
            background-color: rgba(0,0,0,0.2);
            transition: background-color 0.3s;
        }
    }
    &.exit{
        border:none;
        color: white;
        background-color: black;
        &:hover{
            background-color: rgba(0,0,0,0.7);
            transition: background-color 0.3s;
        }
    }
`;
