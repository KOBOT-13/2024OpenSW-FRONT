import styled from "styled-components";

export const Div = styled.div`
    &.Top{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &.Mid{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 55px;
    }
    &.Bottom{
        margin-top: 15px;
    }
`;

export const H1 = styled.h1`
    margin: 86px 0 63px 0;
`;

export const LineWithDots = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 888px; /* 라인의 길이 */
    position: relative;

    &:before,
    &:after {
        content: '';    
        width: 5px; /* 점의 크기 */
        height: 5px; /* 점의 크기 */
        background-color: black; /* 점의 색상 */
        border-radius: 50%;
        position: absolute;
    }

    &:before {
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    &:after {
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
`;

export const Line = styled.div`
  border-top: 2px solid black; /* 라인의 두께 및 색상 */
  width: 100%;
  position: relative;
`;

export const Input = styled.input`
    width: 493px;
    height: 46px;
    border: 1px solid #464646;
    border-radius: 8px;
    padding: 0 19px 0 19px;
    font-family: 'Pretendard-Medium';
    font-size: 16px;
    margin-bottom: 19px;
`;

export const Button = styled.button`
    width: 531px;
    height: 47px;
    background-color: rgba(48, 99, 210, 0.15);
    border: 1px solid #3063d2;
    border-radius: 10px;
    font-family: 'Pretendard-Bold';
    font-size: 16px;
    color: #3063d2;
    margin-top: 36px;
`;

export const Ul = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

export const Li = styled.li`
    font-family: 'Pretendard-Medium';
    font-size: 13px;
    color: #464646;
    float: left;
    list-style: none;
    margin-left: 12px;

    &::before {
        content: '|';
        padding-right: 12px;
    }

    &:first-child::before {
        content: none;
    }
`;