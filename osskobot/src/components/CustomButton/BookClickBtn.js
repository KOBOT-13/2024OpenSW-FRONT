import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { privateAxios } from "../../services/axiosConfig";

const Div = styled.div`
    background: #3063d2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 500px;
    padding: 0 24px 0 24px;
    &:hover{
        background-color: rgba(48, 99, 210, 0.8);
        transition: background-color 0.3s;
    }
    cursor: pointer;
`;

const P = styled.p`
    font-family: 'Pretendard-SemiBold';
    font-size: 14px;
    color: white;
    margin-left: 5px;
    user-select: none;
    white-space: nowrap;
`;

function BookClickBtn({icon: Icon, label, path, id, isMyBook = true}){
    const navigate = useNavigate();
    const [book, setBook] = useState("");
    useEffect(() => {
        if(isMyBook){
            privateAxios.get(`books/book/${id}/`)
            .then((response) => {
                setBook(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }else{
            privateAxios.get(`books/writtenbook/${id}/`)
            .then((response) => {
                setBook(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

    }, []);

    const onClickDiv = () => {
        navigate(`/bookclick/${id}/${path}`, {state: {cover_image:book.cover_image, title:book.title, isMyBook:isMyBook}});
    };

    return(
        <Div onClick={onClickDiv}>
            <Icon/>
            <P>{label}</P>
        </Div>
    );
}

export default BookClickBtn;