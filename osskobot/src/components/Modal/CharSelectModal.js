import styled from "styled-components";
import ReactModal from "react-modal";
import { MdOutlineNotStarted } from "react-icons/md";
import { useState } from "react";
import Swal from "sweetalert2";
import { BsX } from "react-icons/bs";

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
        align-items: center;
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
        align-items: center;
    }
    &.Bottom-Label{
        display: flex;
        align-items: center;
        width: 100%;
    }
    &.Bottom-Btns{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        row-gap: 18px;
        column-gap: 34px;
        margin-top: 18px;
        place-items: center;
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
        background-color: ${(props) => props.$isClick ? "rgba(48, 99, 210, 0.3)" : "rgba(48, 99, 210, 0.15)"};
        transition: background-color 0.3s;
        gap: 5px;
        cursor: pointer;
        &:hover{
            background-color: rgba(48, 99, 210, 0.3);
        }
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

const Button = styled.button`
    width: 107px;
    height: 40px;
    background-color: white;
    border: 1px solid rgba(0,0,0,0.4);
    border-radius: 10px;
    margin-top: 37px;
    font-family: 'Pretendard-Bold';
    font-size: 17px;
    &:hover{
        background-color: rgba(0,0,0,0.1);
        transition: background-color 0.3s;
    }
`;

const XIcon = styled(BsX)`
    width:1.5em;
    height:1.5em;
`;

const Btn = ({name, voice, isClick, onClick}) => {
    const onClickPlay = () => {
        const newAudio = new Audio(require(`../../assets/mp3/${voice}.mp3`));
        newAudio.addEventListener('canplaythrough', () => {
            newAudio.play();
        });
    }
    return(
        <Div className="Btn-Div" $isClick={isClick} onClick={onClick}>
            <P className="Btn-Name">{name}</P>
            <Icon onClick={onClickPlay}/>
        </Div>
    )
}

function CharSelectModal({isOpen, onRequestClose, setChars}) {
    const [index, setIndex] = useState(null);
    const [name, setName] = useState('');
    const [charIndex, setCharIndex] = useState(0);

    const btns = [
        {name: "여자 아이", voice:'little_girl', back:'여자_어린아이'},
        {name: "남자 아이", voice:'little_boy', back:'남자_어린아이'},
        {name: "성인 여자", voice:'woman_adult', back:'여자_성인'},
        {name: "성인 남자", voice:'man_adult', back:'남자_성인'},
        {name: "할머니", voice:'woman_old', back:'여자_노인'},
        {name: "할어버지", voice:'man_old', back:'남자_노인'},
    ]

    const onClickAdd = () => {
        if(index !== null && name.length !== 0){
            setChars((prev) => [...prev, {name:name, index:charIndex, voice:btns[index].back}]);
            setCharIndex((prev) => prev+1);
            Swal.fire({
                icon: "success",
                text: "등장인물이 추가되었습니다.",
                confirmButtonColor: "#007AFF",
                confirmButtonText: "확인"
            });
            setName('');
            setIndex(null);
        } else if(name.length === 0){
            Swal.fire({
                icon: "warning",
                text: "등장인물 이름을 작성해주세요.",
                confirmButtonColor: "#007AFF",
                confirmButtonText: "확인"
            });
        } else{
            Swal.fire({
                icon: "warning",
                text: "목소리를 선택해주세요.",
                confirmButtonColor: "#007AFF",
                confirmButtonText: "확인"
            });
        }
    }

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={() => onRequestClose(false)}
        >
            <Div className="Top">
                <P className="Title-Top">등장인물 추가</P>
                <P className="Exit" onClick={() => onRequestClose(false)}><XIcon/></P>
            </Div>
            <Div className="Mid">
                <P className="Name-Mid">이름</P>
                <Input placeholder="등장인물의 이름을 입력해주세요." value={name} onChange={(e) => setName(e.target.value)} />
            </Div>
            <Div className="Bottom">
                <Div className="Bottom-Label">
                    <P className="Name-Mid">목소리</P>
                    <P className="Content-Bottom">등장인물의 목소리를 정해주세요.</P>
                </Div>
                <Div className="Bottom-Btns">
                    {btns.map((value, key) => {
                        return <Btn key={key} name={value.name} voice={value.voice} onClick={() => setIndex(key)} isClick={index === key} />
                    })}
                </Div>
                <Button onClick={onClickAdd}>추가하기</Button>
            </Div>
        </Modal>
    )
}

export default CharSelectModal;