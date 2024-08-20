import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GoHeartFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { privateAxios } from "../../services/axiosConfig";
import cookies from 'js-cookie';

const Div = styled.div`
    &.Book{
        display: flex;
        justify-content: center;
        width: 290px;
        height: 420px;
    }
    &.Frame{
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
    }
    &.Info{
        margin-top: 15px;
    }
    &.WishList{
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }
    &.BookCover{
        position: relative;
    }
`;

const BookImage = styled.img`
    margin: 0;
    width: 220px;
    height: 326px;  
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3);
`;

const P = styled.p`
    margin: 0;
    &.title{
        font-family: 'Pretendard-SemiBold';
        font-size: 18px;
    }
    &.author{
        font-family: 'Pretendard-Regular';
        font-size: 14px;
        opacity: 0.4;
        margin-top: 10px;
    }
    &.bookTitle{
        width: 200px;
        font-family: 'Pretendard-Bold';
        font-size: 30px;
        position: absolute;
        top: 90px;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        pointer-events: none; /* 클릭 불가, 이미지 클릭 시 방해되지 않도록 설정 */
    }
`;

const Heart = styled(GoHeartFill)`
    color: ${(props) => props.$isWish ? "red" : "rgba(0,0,0,0.3)"};
    background-color: rgba(0,0,0,0.05);
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 100%;
    padding: 5px;
    position: absolute; /* 위치를 절대적으로 설정 */
    top: 25%; /* 상단 위치를 조정 */
    right: 0; /* 우측 위치를 조정 */
`;

function Book({title, author, id, cover_image, isWish}) {
    const navigate = useNavigate();
    const [_isWish, setIsWish] = useState(isWish);
    const token = cookies.get('token');
    const click = () => {
        privateAxios.post(`books/wishlist/toggle/${id}/`, )
        .then(() => {
            setIsWish((current) => !current);
        }).catch((error) => {
            console.log(error);
        });
    };

    const onClickBook = () => {
        navigate(`/bookclick/${id}/`);
    }

    useEffect(() => {
        setIsWish(isWish);
    }, [isWish])

    return (
        <Div className="Book" onClick={onClickBook}>
            <Div className="Frame">
                <Div className="BookCover">
                    <BookImage src={`${process.env.REACT_APP_ADDRESS}/${cover_image}`} />
                    <P className="bookTitle">{title}</P>
                </Div>
                <Div className="WishList">
                    <Div className="Info">
                        <P className="title">{title}</P>
                        <P className="author">저자 {author}</P>
                    </Div>
                    {token ? <Heart $isWish={_isWish} onClick={(e) => {e.stopPropagation();click()}}/> : null}
                </Div>
            </Div>
        </Div>
    )
}

export default Book;