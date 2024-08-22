import styled from "styled-components";

export const Div = styled.div`
    &.Main{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    &.Top{
        position: relative;
        width: 70%;
        height: 200px;
        background-color: #fafafa;
        border-radius: 20px;
        display: flex;
        align-items: center;
    }

    &.Profile-Container{
        display: flex;
    }
    &.UserInfo{
        align-self: center;
    }
    &.Modify-Btn{
        position: absolute;
        top: 25px;
        right: 25px;
        display:flex;
        align-items: center;
        justify-content: center;
        width: 96px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid rgba(0,0,0,0.15);
        &:hover{
            background-color: #e0e0e0;
            transition: background-color 0.3s;
        }
    }
    &.Delete-Btn{
        position: absolute;
        top: 25px;
        right: 130px;
        display:flex;
        align-items: center;
        justify-content: center;
        width: 96px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid rgba(0,0,0,0.15);
        &:hover{
            background-color: #e0e0e0;
            transition: background-color 0.3s;
        }
    }
    &.Mid{
        width: 1160px;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
    }
    &.Mid-Btns{
        display: flex;
    }
    &.Active{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
    &.WishList{
        width: 100%;
        display: flex;
        flex-flow: row wrap;
    }
    &.BookReport{
        width: 100%;
        background-color: #f7f7f7;
    }
    &.QuizRecord{
        margin-top: 15px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-items: start;  /* 왼쪽 정렬 */
        row-gap: 20px;
        column-gap: 40px;
    }
    &.ConversationList{
        margin-top: 40px;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        row-gap: 50px;
        column-gap: 60px;
    }
`;

export const P = styled.p`
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    &.nickname{
        font-family: 'Pretendard-Bold';
        font-size: 24px;
    }
    &.profile-modify{
        margin: 0;
        font-family: 'Pretendard-Bold';
        font-size: 11px;
        margin-left: 6px;
        user-select: none;
    }
    &.profile-delete{
        margin: 0;
        font-family: 'Pretendard-Bold';
        font-size: 11px;
        margin-left: 7px;
        user-select: none;
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

export const Image = styled.img`
    width: 125px;
    margin: 38px 55px 38px 55px;
`;