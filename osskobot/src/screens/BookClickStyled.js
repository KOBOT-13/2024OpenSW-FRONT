import styled from "styled-components";
import Pagination from 'react-js-pagination';
import { GoHeartFill } from "react-icons/go";

export const Div = styled.div`
    &.MainContainer{
        display: flex;
        flex-direction: column;
    }
    &.Detail{
        display: flex;
        justify-content: center;
    }
    &.Frame{
        width: 1160px;
        display: flex;
        justify-content: center;
        margin: 30px 140px 0 140px;
        background-color: #fafafa;
        border-radius: 20px;
    }
    &.Right{
        width: 100%;
        height: 90%;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
    }
    &.Info{
        margin-top: 57px;
    }
    &.Btns{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        gap:20px;
        margin-bottom: 22px;
    }
    &.Middle{
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    &.Btns-Middle{
        width: 1160px;
        display: flex;
    }
    &.Content-Middle{
        width: 1160px;
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }
    &.Book-Intro{
        font-family: 'Pretendard-Regular';
        font-size: 16px;
        line-height: 30px;
    }
    &.Char-Intro{
        display: flex;
        justify-content: space-evenly;
    }
    &.Comment-Middle{
        width: 100%;
    }
    &.Comment-Board{
        display: flex;
        flex-direction: column;
        height: 200px;
        border: 1px solid rgba(0,0,0,0.15);
        border-radius: 10px;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &.Comment-Btn{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &.Bottom{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 40px;
    }
    &.Comment-Written{
        width: 1160px;
    }
    &.Comments{
        width: 100%;
        height: auto;
        margin-top: 20px;
        border-top: 1px solid rgba(0, 0, 0, 0.5);
        background-color: #F7F7F7;
    }
`;

export const Image = styled.img`
    margin-right: 100px;
    margin: 57px 100px 57px 80px;
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3);
`;

export const P = styled.p`
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    color: rgba(0,0,0,0.8);

    &.title{
        font-family: 'Pretendard-Bold';
        font-size: 24px;
        color: black;
        margin-top: 0;
    }
    &.comment-size{
        margin: 0;
        margin-left: 10px;
        font-size: 11px;
        align-self: flex-end;
    }
    &.cwtitle{
        font-family: 'Pretendard-Bold';
        font-size: 16px;
        margin: 0;
    }
`;

export const Hr = styled.hr`
    width: 40px;
    margin: 0;
    border: 1px solid #007aff;
`;

export const TextArea = styled.textarea`
    width: 100%;
    height: 100%;
    border:0;
    padding: 10px;
    resize: none;
    overflow: auto;
    box-sizing: border-box;
    &:focus{
        outline: 0;
    }
`;

export const Button = styled.button`
    font-family: 'Pretendard-Bold';
    font-size: 14px;
    background: none;
    width: 97px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    margin-left: 10px;
    cursor: pointer;
    &:hover{
        background-color: rgba(0,0,0,0.1);
        transition: background-color 0.3s;
    }
`;

const StyledPaginationWrapper = styled.div`
    ul {
        display: flex;
        justify-content: center;
        padding: 10px 0;
        list-style: none;
    }
  
    li {
        margin: 0 5px;
    }

    li a {
        display: block;
        padding: 8px 16px;
        border: 1px solid #ddd;
        border-radius: 4px;
        color: #007bff;
        text-decoration: none;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 123, 255, 0.5);
            transition: background-color 0.3s;
        }
    }

    .active a {
        background-color: #007bff;
        color: white;
        border: 1px solid #007bff;
    }

    .disabled a {
        color: #ccc;
        cursor: not-allowed;
    }
`;

export const Heart = styled(GoHeartFill)`
    width: 20px;
    height: 20px;
    color: ${(props) => props.$isWish ? "red" : "rgba(0,0,0,0.3)"};
    background-color: rgba(0,0,0,0.05);
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 100%;
    padding: 5px;
    position: absolute; /* 위치를 절대적으로 설정 */
    top: 42px; /* 상단 위치를 조정 */
    right: 30px; /* 우측 위치를 조정 */
    cursor: pointer;
`;

export const CommentsPage = (props) => {
    return (
        <StyledPaginationWrapper>
            <Pagination {...props} />
        </StyledPaginationWrapper>
    );
}