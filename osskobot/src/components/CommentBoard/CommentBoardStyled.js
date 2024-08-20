import styled from "styled-components"

export const HeartIcon = ({onClick, isLikes, width = 14, height = 14}) => {
    return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={onClick}
        >
          <path
            d="M7.00008 12.4542L6.15425 11.6842C3.15008 8.96 1.16675 7.1575 1.16675 4.95833C1.16675 3.15583 2.57841 1.75 4.37508 1.75C5.39008 1.75 6.36425 2.2225 7.00008 2.96333C7.63591 2.2225 8.61008 1.75 9.62508 1.75C11.4217 1.75 12.8334 3.15583 12.8334 4.95833C12.8334 7.1575 10.8501 8.96 7.84591 11.6842L7.00008 12.4542Z"
            fill={isLikes ? "#FF000A" : "#C6C6C6"} // Use the color prop here
          />
        </svg>
      );
}

export const Div = styled.div`
    font-family: 'Pretendard-Regular';
    font-size: 15px;
    &.Frame{
        margin: 20px 60px 20px 60px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    &.Content{
        margin-top: 10px;
        margin-bottom: 20px;
    }
    &.Top{
        display:flex;
        justify-content: space-between;
    }
    &.Option{
        font-family: 'Pretendard-SemiBold';
        font-size: 14px;
        user-select: none;
    }
    &.New-Commnet-Board{
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
        background-color: white;
        margin-top: 30px;
    }
    &.NewComment-Btn{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
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
    float: left;
    list-style: none;
    font-family: 'Pretendard-Medium';
    font-size: 14px;
    color: rgba(0,0,0,0.4);

    &::before {
        content: '|';
        padding-right: 10px;
        padding-left: 10px;
    }
    &:first-child::before {
        content: none;
    }
    &.Heart{
        display:flex;
        align-items: center;
        user-select: none;
        cursor: pointer;
    }
`;

export const Button = styled.button`
    background: none;
    border: none;
    &.Edit{
        color: #FF000A;
    }
    cursor: pointer;
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

export const P = styled.p`
    font-family: 'Pretendard-Regular';
    color: rgba(0,0,0,0.8);
    margin: 0;
    margin-left: 10px;
    font-size: 11px;
    align-self: flex-end;
`;