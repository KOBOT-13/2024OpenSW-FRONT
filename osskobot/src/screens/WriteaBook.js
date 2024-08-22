import styled from "styled-components";
import CharSelectModal from "../components/Modal/CharSelectModal";

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
        width: 73px;
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
`;

function CharComponent({name}){
    return(
        <Div className="CharContainer">
            {name}
        </Div>
    )
}

function WriteaBook(){
    

    return(
        <Div className="Main">
            <Div className="Top">
                <P className="H1">내가 작가 되어보기</P>
                <Div className="Input">
                    <Label>책 제목</Label>
                    <Input type="text" placeholder="책 제목을 입력해주세요." />
                </Div>
                <Div className="Input">
                    <Label>등장인물</Label>
                    <Div className="Chars">
                        <CharComponent name={"이재영"}/>
                    </Div>
                    <AddChar>등장인물 추가</AddChar>
                    <CharSelectModal isOpen={true}/>
                </Div>
                <Div className="Content">
                    <Label>책 내용</Label>
                    <Div className="TextDiv">
                        <TextArea placeholder="직접 쓴 책의 내용을 적어주세요." />
                    </Div>
                </Div>
            </Div>
            <Div className='Btns-Mid'>
                <Button className='cancle'>취소하기</Button>
                <Button>작성하기</Button>
            </Div>
        </Div>
    )    
}

export default WriteaBook;