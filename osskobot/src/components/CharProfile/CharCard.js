import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { privateAxios } from '../../services/axiosConfig';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Div = styled.div`
    &.CardContainer{
        position: relative;
        width: 150px;
        height: 225px;
        border: 2px solid rgba(66, 133, 244, 0.8);
        border-radius: 20px;
        background-color: rgba(66, 133, 244, 0.2);
        box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        &:hover{
            background-color: rgba(66, 133, 244, 0.4);
        }
    }
    &.InfoContainer{
        position: absolute;
        left:29px;
        bottom: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

const Img = styled.img`
    position: absolute;
    left:14px;
    top:16px;
    width: 121px;
    height: 121px;
`;

const P = styled.p`
    font-family: 'Pretendard-Regular';
    color: #646464;
    margin: 0;
    margin-top: 5px;
    &.title{
        font-size: 14px;
    }
    &.name{
        font-family: 'Pretendard-SemiBold';
        font-size: 16px;
        color: #3063d2;
    }
    &.date{
        font-size: 10px;
    }
`;

function CharCard({value, cover_image}) {
    const [charInfo, setCharInfo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        privateAxios.get(`books/character/${value.character}/`)
        .then((response) => {
            setCharInfo(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const onClickCard = () => {
        navigate(`/bookclick/${value.book}/chatcharchoose/${value.character}/chat`, {state:{cover_image:`${process.env.REACT_APP_ADDRESS}${cover_image}`, title:value.book_title}});
    }

    return (
        <Div className='CardContainer' onClick={onClickCard}>
            <Img src={charInfo.character_image}/>
            <Div className='InfoContainer'>
                <P className='title'>{value.book_title}</P>
                <P className='name'>{value.character_name}</P>
                <P className='date'>{format(value.updated_at, 'yy.MM.dd HH:mm')}</P>
            </Div>
        </Div>
    );
}

export default CharCard;