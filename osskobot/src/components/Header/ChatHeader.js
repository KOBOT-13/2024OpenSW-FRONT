import styled from "styled-components";

const Div = styled.div`
    &.BG-Top{
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
const Image = styled.img`
    width: 85px;
    margin-right: 40px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
`;

const P = styled.p`
    font-family: 'Pretendard-Bold';
    font-size: 30px;
    margin: 0;
`;

function ChatHeader({cover_image, title}) {
    return (
        <Div className="BG-Top">
            <Div className="Info">
                <Image src={cover_image} />
                <P>{title}</P>
            </Div>
        </Div>
    )
}

export default ChatHeader;