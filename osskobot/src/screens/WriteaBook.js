import styled from "styled-components";
import CharSelectModal from "../components/Modal/CharSelectModal";
import { useState } from "react";
import { BsX } from "react-icons/bs";
import {privateAxios} from '../services/axiosConfig';
import cookies from 'js-cookie';
import {format} from 'date-fns';
import Swal from "sweetalert2";

const Div = styled.div`
    &.Main{
        display:flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
    }
    &.Top{
        display: flex;
        flex-direction: column;
        width: 80%;
        row-gap: 17px;
    }
    &.Input{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &.Content{
        display: flex;
        flex-direction: column;
        row-gap: 15px;
    }
    &.TextDiv{
        border: 1px solid black;
        border-radius: 10px;
        width: 100%;
        height: 600px;
        display:flex;
        align-items:center;
        justify-content: center;
    }
    &.Btns-Mid{
        width: 80%;
        display: flex;
        justify-content: flex-end;
    }
    &.Chars{
        width: 83%;
        overflow-x: auto;  /* 가로 스크롤 활성화 */
        overflow-y: hidden; /* 필요시 수직 스크롤도 설정 가능 */
        display: flex;
        column-gap: 13px;
        white-space: nowrap; /* 자식들이 한 줄에 나오게 강제 */
    }
    &.CharContainer{
        border: 1px solid rgba(0,0,0,0.4);
        border-radius: 500px;
        padding: 0 10px 0 10px;
        height: 36px;
        background-color: #f8f8f8;
        font-family: 'Pretendard-Medium';
        font-size: 18px;
        color: #3063d2;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box; /* 박스 크기를 고정 */
        flex-shrink: 0; /* 크기가 줄어들지 않게 설정 */
        user-select: none;
        cursor: pointer;
    }
`;

const P = styled.p`
    margin: 0;
    &.H1{
        font-family: 'Pretendard-Bold';
        font-size: 30px;
        margin-bottom: 14px;
    }
`;

const Label = styled.label`
    font-family: 'Pretendard-Medium';
    font-size: 24px;
`;

const Input = styled.input`
    font-family: 'Pretendard-Medium';
    font-size: 20px;
    width: 92%;
    border: none;
    border-bottom: 1px solid black;
    &:focus{
        outline: none;
    }
`;

const TextArea = styled.textarea`
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    margin: 15px 30px 15px 30px;
    resize: none;
    width: 100%;
    height: 95%;
    border:none;
    &:focus{
        outline: none;
    }
    overflow-y: auto;
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
    &.cancle{
        margin-right: 10px;
        background-color: white;
        color: black;
        border: 1px solid rgba(0,0,0,0.15);
        &:hover{
            background-color: rgba(0,0,0,0.2);
            transition: background-color 0.3s;
        }
    }
    &:hover{
        background-color: rgba(0,0,0,0.7);
        transition: background-color 0.3s;
    }
`;

const AddChar = styled.button`
    font-family: 'Pretendard-Bold';
    font-size: 14px;
    width: 116px;
    height: 40px;
    border: 1px solid rgba(0,0,0,0.8);
    border-radius: 500px;
    background-color: #f8f8f8;
    &:hover{
        background-color: rgba(0,0,0,0.2);
        transition: background-color 0.3s;
    }
`;

const XIcon = styled(BsX)`

`;

function CharComponent({name, index, deleteChar}){
    const [isHover, setIsHover] = useState(true);

    return(
        <Div className="CharContainer" onMouseOver={() => setIsHover(false)} onMouseOut={() => setIsHover(true)} onClick={() => deleteChar(index)}>
            {name}
            {isHover ? null : <XIcon/>}
        </Div>
    )
}

function WriteaBook(){
    const [chars, setChars] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [synopsis, setSynopsis] = useState("");

    const deleteChar = (index) => {
        const updateChar = chars.filter(item => item.index !== index)
        setChars(updateChar);
    }

    const onClickApply = () => {
        const names = chars.map(item => item.name);
        const voices = chars.map(item => item.voice);
        privateAxios.post(`books/writtenbook/`,
            {
                user: cookies.get('pk'),
                title: title,
                author: cookies.get('username'),
                publication_date: format(new Date(), 'yyyy-MM-dd'),
                synopsis: synopsis,
                character: names,
                speaker: voices
            }
        ).then(() => {
            Swal.fire({
                icon: "success",
                html: `책이 정상적으로 추가되었습니다.<br/>작성한 책은 마이페이지 → 내가 쓴 책 에서 확인할 수 있습니다.`,
                confirmButtonColor: "#007AFF",
                confirmButtonText: "확인"
            });
            setChars([]);
            setTitle("");
            setSynopsis("");
            
        }).catch(() => {
            Swal.fire({
                icon: "error",
                text: `책 등록이 실패되었습니다.`,
                confirmButtonColor: "#007AFF",
                confirmButtonText: "확인"
            });
        })
    }

    return(
        <Div className="Main">
            <Div className="Top">
                <P className="H1">내가 작가 되어보기</P>
                <Div className="Input">
                    <Label>책 제목</Label>
                    <Input type="text" placeholder="책 제목을 입력해주세요." value={title} onChange={(e) => setTitle(e.target.value)} />
                </Div>
                <Div className="Input">
                    <Label>등장인물</Label>
                    <Div className="Chars">
                        {chars.map((value, key) => {
                            return <CharComponent key={key} name={value.name} index={value.index} deleteChar={deleteChar}/>
                        })}
                    </Div>
                    <AddChar onClick={() => setIsOpen(true)}>등장인물 추가</AddChar>
                    <CharSelectModal isOpen={isOpen} onRequestClose={setIsOpen} setChars={setChars}/>
                </Div>
                <Div className="Content">
                    <Label>책 내용</Label>
                    <Div className="TextDiv">
                        <TextArea placeholder="직접 쓴 책의 내용을 적어주세요." value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
                    </Div>
                </Div>
            </Div>
            <Div className='Btns-Mid'>
                <Button onClick={onClickApply}>작성하기</Button>
            </Div>
        </Div>
    )    
}

export default WriteaBook;