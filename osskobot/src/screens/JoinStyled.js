import styled from 'styled-components';

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
        gap: 33px;
        margin-top: 62px;
    }
    &.Bottom{
        display: flex;
        justify-content: center;
        margin-top: 72px;
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

export const Apply = styled.button`
    background-color: rgba(48, 99, 210, 0.15);
    border: 1px solid #3063d2;
    border-radius: 10px;
    width: 531px;
    height: 47px;
    font-family: 'Pretendard-Bold';
    font-size: 18px;
    color: #3063d2;
    cursor: pointer;
    &:hover{
        background-color: rgba(48, 99, 210, 0.3);
    }
`;

const Label = styled.label`
    font-family: 'Pretendard-Medium';
    font-size: 21px;
    color: #464646;
`;

const Input = styled.input`
    border: 1px solid #464646;
    border-radius: 8px;
    padding: 0 19px 0 19px;
    width: 493px;
    height: 46px;
    margin-left: 51px;
    margin-right: 19px;
    font-family: 'Pretendard-Medium';
    font-size: 16px;
`;

const InputDiv = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 115px 1fr auto; /* Label, Input, Button */
    align-items: center;
    width: 865px;
`;

const ErrorDiv = styled.div`
    position: absolute;
    left: 170px;
    top: 50px;
    font-family: 'Pretendard-Medium';
    font-size: 10px;
    color: ${props => props.$isValid ? "#00ac55" : "#ff4040"};
`;

const Button = styled.button`
    color: #3063d2;
    border: 1px solid #3063d2;
    border-radius: 10px;
    font-family: 'Pretendard-Medium';
    font-size: 16px;
    background-color: white;
    width: 121px;
    height: 46px;
    cursor: pointer;
    &:hover{
        background-color: rgba(0,0,0,0.3);
    }
`;

export function LabelInputButton({label, onChange, onClick, ErrorMsg, name, isValid}){
    return (
        <InputDiv>
            <Label>{label}</Label>
            <Input type='text' name={`${name}`} onChange={onChange} />
            <Button onClick={() => onClick()}>중복확인</Button>
            <ErrorDiv $isValid={isValid}>{ErrorMsg}</ErrorDiv>
        </InputDiv>
    );
}

export function LabelInput({label, onChange, ErrorMsg, name, type, isValid}){
    return (
        <InputDiv>
            <Label>{label}</Label>
            <Input type={type} name={name} onChange={onChange}/>
            <ErrorDiv $isValid={isValid}>{ErrorMsg}</ErrorDiv>
        </InputDiv>
    );
}