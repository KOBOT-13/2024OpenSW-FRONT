import styled from "styled-components";

const Div = styled.div`
    width: 240px;
    height: 45px;
    box-shadow: ${({ $props }) => ($props ? "inset 0 -4px 0 rgba(0, 0, 0, 1)" : "inset 0 -1px 0 rgba(0, 0, 0, 0.1)")};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform .5s, box-shadow .5s;
`;

const P = styled.p`
    font-family: ${({ $props }) => ($props ? 'Pretendard-Bold' : 'Pretendard-Medium')};
    font-size: 16px;
    text-align: center;
    user-select: none;
`;

function BottomBorderBtn({label, index, onClick}){
    return(
        <Div onClick={onClick} $props={index}>
            <P $props={index}>{label}</P>
        </Div>
    )
}

export default BottomBorderBtn;