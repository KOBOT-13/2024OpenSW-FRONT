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
`;

export const Image = styled.img`
    width: 214px;
    height: 214px;
`;

export const P = styled.p`
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    font-family: 'Pretendard-Bold';
    font-size: 27px;
    margin: 0;
    margin-left: 10px; 
    max-width: 90%; /* 최대 너비를 부모 요소에 맞추기 */
    overflow-wrap: break-word; /* 단어 단위로 줄바꿈 */
    white-space: normal; /* 공백을 여러 줄로 표시 */
    text-align: center; /* 중앙 정렬 */
`;
