import styled from "styled-components";

const Button = styled.button`
    font-family: ${($props) => ($props ? 'Pretendard-Bold':'Pretendard-Medium')};
    font-size: 16px;
    color: ${({$props}) => ($props ? 'white' : '#38383C')};
    background-color: ${({$props}) => ($props ? '#38383C' : 'white')};
    padding: 10px 20px 10px 20px;
    border-radius: 20px;
    border-color: rgba(0, 0, 0, 0.05);
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
    &:hover{
        background-color: ${({$props}) => ($props ? '#38383C' : 'rgba(56,56,60,0.3)')};
        transition: background-color 0.3s;
    }
`;

function CategoryBtn({index, content, onClick}){
    return(
        <Button onClick={onClick} $props={index}>{content}</Button>
    )
}

export default CategoryBtn;