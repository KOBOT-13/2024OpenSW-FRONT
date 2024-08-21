import styled from "styled-components";

export const Div = styled.div`
    &.MainContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    &.Top{
        width: 70%;
        display:flex;
        justify-content: flex-end;
        margin-top: 82px;
    }
    &.Mid{
        width: 70%;
        height: 700px;
        margin-top: 15px;
    }
    &.Btns-Mid{
        display: flex;
        justify-content: flex-end;
    }
`;

export const TextArea = styled.textarea`
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    width: 100%;
    height: 100%;
    padding: 35px;
    resize: none;
    overflow: auto;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 10px;
    box-sizing: border-box;
    &:focus{
        outline: 0;
    }
`;

export const Button = styled.button`
    background-color: black;
    font-family: 'Pretendard-Bold';
    font-size: 17px;
    color: white;
    width: 105px;
    height: 40px;
    border: none;
    border-radius: 10px;
    align-self: flex-end;
    margin-top: 15px;
    &.cancle{
        margin-right: 10px;
        background-color: white;
        color: black;
        border: 1px solid rgba(0,0,0,0.15);
        &:hover{
            background-color: rgba(0,0,0,0.2);
            transition: background-color 0.3s;
        }
    }
    &:hover{
        background-color: rgba(0,0,0,0.7);
        transition: background-color 0.3s;
    }
`;