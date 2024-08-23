import styled from "styled-components";

const Div = styled.div`
    position: relative;
`;

const Img = styled.img`
    width: ${props => props.$size}px;
`;

const P = styled.p`
    width: 89%;
    font-family: 'Pretendard-Bold';
    font-size: ${props => props.$font_size}px;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    pointer-events: none; /* 클릭 불가, 이미지 클릭 시 방해되지 않도록 설정 */
    margin: 0;
`;

function SizeBook({cover_image, size, title, font_size}){
    return(
        <Div>
            <Img src={cover_image} $size={size}/>
            <P $font_size={font_size}>{title}</P>
        </Div>
    )
}

export default SizeBook;