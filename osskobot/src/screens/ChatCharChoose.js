import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import CharProfile from "../components/CharProfile/CharProfile";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { publicAxios } from '../services/axiosConfig';
import ChatHeader from "../components/Header/ChatHeader";

const Div = styled.div`
    &.MainContainer{
        display: flex;
        flex-direction: column;
    }
    &.Top{
        display: flex;
        justify-content: center;
    }
    &.Mid{
        margin-top: 74px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    &.CharProfiles{
        margin-top: 68px;
        display: flex;
    }
    &.Bottom{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 68px;
    }
    &.Frame-Bottom{
        width: 70%;
        display:flex;
        flex-direction: column;
    }
    &.BG-Bottom{
        display: flex;
        background-color: #f2f3f7;
        border-radius: 10px;
        border: 1px solid black;
        padding: 29px 0 29px 72px;
        align-items: center;
    }
    &.CharProfile{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 64px;
    }
`;

const Image = styled.img`
    &.CharImage{
        width: 120px;
        height: 120px;
    }
`;

const P = styled.p`
    font-family: 'Pretendard-Bold';
    font-size: 30px;
    margin: 0;
    &.name{
        font-family: 'Pretendard-Regular';
        font-size: 16px;
    }
    &.description{
        font-family: 'Pretendard-Medium';
        font-size: 25px;
        margin-right: 30px;
    }
`;

const Button = styled.button`
    background-color: black;
    font-family: 'Pretendard-Bold';
    font-size: 17px;
    color: white;
    width: 105px;
    height: 40px;
    border: none;
    border-radius: 10px;
    align-self: flex-end;
    margin-top: 15px;
    &:hover{
        background-color: rgba(0,0,0,0.7);
        transition: background-color 0.3s;
    }
    cursor: pointer;
`;

function CharCharChoose() {
    const [characters, setCharacters] = useState([]);
    const { id, characterid } = useParams();
    const [charIndex, setCharIndex] = useState(undefined);
    
    const navigate = useNavigate();
    const {state} = useLocation();
    const {cover_image, title, isMyBook} = state;

    useEffect(() => {
        const getCharacters = async () => {
            try {
                const characters_response = await publicAxios.get(`books/${id}/characters/`)
                setCharacters(characters_response.data)
                console.log(characters);
            } catch (error) {
                console.log(error);
            }
        };
        const getMyBookCharacters = async () => {
            try {
                const characters_response = await publicAxios.get(`books/writtenbook/${id}/characters/`)
                setCharacters(characters_response.data)
                console.log(characters);
            } catch (error) {
                console.log(error);
            }
        };
        if(isMyBook){
            getCharacters();
        }
        else{
            getMyBookCharacters();
        }
    }, [id]);

    
    const onClickTalk = () => {
        navigate(`/bookclick/${id}/chatcharchoose/${characters[charIndex].id}/chat`, {state:{cover_image:cover_image, title:title, isMyBook:isMyBook}})
    }

    return (
        <Div className="MainContainer">
            <Div className="Top">
                <ChatHeader cover_image={cover_image} title={title} />
            </Div>
            <Div className="Mid">
                <P>대화하고 싶은 등장인물을 선택해주세요</P>
                <Div className="CharProfiles">
                    {characters.map((value, key) => {
                        return <CharProfile character={value} key={key} size={120} onClick={() => setCharIndex(key)} />
                    })}
                </Div>
            </Div>
            <Div className="Bottom">
                {charIndex !== undefined ?
                <Div className="Frame-Bottom">
                    <Div className="BG-Bottom">
                            <Div className="CharProfile">
                                <Image className="CharImage" src={characters[charIndex].character_image} />
                                <P className="name">{characters[charIndex].name}</P>
                            </Div>
                        <P className="description">{characters[charIndex].greeting}</P>
                    </Div>
                    <Button onClick={onClickTalk}>대화하기</Button>
                </Div>
                : null}
            </Div>
        </Div>
    );
}

export default CharCharChoose;