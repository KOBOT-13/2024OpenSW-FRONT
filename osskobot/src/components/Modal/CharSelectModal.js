import styled from "styled-components";
import ReactModal from "react-modal";
import { MdOutlineNotStarted } from "react-icons/md";
import { useEffect, useState } from "react";

const Modal = styled(ReactModal)`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 440px;
    height: 575px;
    transform: translate(-50%, -50%);
    background-color: #f2f3f7;
    border: 1px solid black;
    border-radius: 10px;
    &:focus{
        outline: 0;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Div = styled.div`
    &.Top{
        display: flex;
        justify-content: space-between;
        width: 80%;
        margin-top: 50px;
    }
    &.Mid{
        display: flex;
        flex-direction: column;
        width: 80%;
        margin-top: 37px;
    }
    &.Bottom{
        display: flex;
        flex-direction: column;
        width: 80%;
        margin-top: 46px;
    }
    &.Bottom-Label{
        display: flex;
        align-items: center;
    }
    &.Bottom-Btns{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        row-gap: 34px;
        column-gap: 18px;
        margin-top: 18px;
    }
    &.Btn-Div{
        position: relative;
        display: flex;
        align-items:center;
        justify-content: center;
        width: 147px;
        height: 47px;
        border: 1px solid #3063d2;
        border-radius: 10px;
        background-color: rgba(48, 99, 210, 0.15);
        gap: 5px;
        cursor: pointer;
    }
`;

const P = styled.p`
    user-select: none;
    margin: 0;
    &.Title-Top{
        font-family: 'Pretendard-Bold';
        font-size: 30px;
    }
    &.Exit{
        font-family: 'Pretendard-Medium';
        font-size: 30px;
    }
    &.Name-Mid{
        font-family: 'Pretendard-Medium';
        font-size: 23px;
    }
    &.Content-Bottom{
        font-family: 'Pretendard-Medium';
        font-size: 15px;
        color: #878787;
        margin-left: 13px;
    }
    &.Btn-Name{
        font-family: 'Pretendard-Bold';
        font-size: 18px;
        color: #3063d2;
        position: absolute;
        left: 60px;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

const Input = styled.input`
    font-family: 'Pretendard-Medium';
    font-size: 18px;
    border:0;
    border-bottom: 1px solid black;
    background: none;
    margin-top: 8px;
    &:focus{
        outline: 0;
    }
    padding-bottom: 8px;
`;

const Icon = styled(MdOutlineNotStarted)`
    width: 25px;
    height: 25px;
    position: absolute;
    right: 20px;
`;

const Btn = ({name, voice}) => {
    const onClickPlay = () => {
        const newAudio = new Audio(require(`../../assets/mp3/${voice}.mp3`));
        newAudio.addEventListener('canplaythrough', () => {
            newAudio.play();
        });
    }

    return(
        <Div className="Btn-Div">
            <P className="Btn-Name">{name}</P>
            <Icon onClick={onClickPlay}/>
        </Div>
    )
}

function CharSelectModal({isOpen}) {
    const btns = [
        {name: "여자 아이", voice:'little_girl'},
        {name: "남자 아이", voice:'little_boy'},
        {name: "성인 여자", voice:'woman_adult'},
        {name: "성인 남자", voice:'man_adult'},
        {name: "할머니", voice:'woman_old'},
        {name: "할어버지", voice:'man_old'},
    ]

    return(
        <Modal
            isOpen={isOpen}
        >
            <Div className="Top">
                <P className="Title-Top">등장인물 추가</P>
                <P className="Exit">X</P>
            </Div>
            <Div className="Mid">
                <P className="Name-Mid">이름</P>
                <Input placeholder="등장인물의 이름을 입력해주세요." />
            </Div>
            <Div className="Bottom">
                <Div className="Bottom-Label">
                    <P className="Name-Mid">목소리</P>
                    <P className="Content-Bottom">등장인물의 목소리를 정해주세요.</P>
                </Div>
                <Div className="Bottom-Btns">
                    {btns.map((value, key) => {
                        return <Btn name={value.name} voice={value.voice}/>
                    })}
                </Div>
            </Div>
        </Modal>
    )
}

export default CharSelectModal;