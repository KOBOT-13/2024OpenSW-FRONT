import styled from "styled-components";
import SizeBook from "../Book/SizeBook";

const Div = styled.div`
    &.BG-Top{
        margin-top: 38px;
        display: flex;
        align-items: center;
        padding: 17px 0 17px 50px;
        width: 70%;
        background-color: #fafafa;
        border-radius: 20px;
    }
    &.Info{
        display:flex;
        align-items: center;
    }
`;

const P = styled.p`
    font-family: 'Pretendard-Bold';
    font-size: 30px;
    margin: 0;
    margin-left: 40px;
`;

function ChatHeader({cover_image, title}) {
    return (
        <Div className="BG-Top">
            <Div className="Info">
                <SizeBook cover_image={`${process.env.REACT_APP_ADDRESS}${cover_image}`} title={title} size={84} font_size={11} />
                <P>{title}</P>
            </Div>
        </Div>
    )
}

export default ChatHeader;