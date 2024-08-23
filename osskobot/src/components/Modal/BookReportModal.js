import styled from "styled-components";
import Modal from "react-modal";
import { privateAxios } from "../../services/axiosConfig";
import CustomModal from "./CheckModal";
import Swal from "sweetalert2";
import { useState } from "react";
import { BsX } from "react-icons/bs";

const ReportModal = styled(Modal)`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 720px;
    height: 780px;
    transform: translate(-50%, -50%);
    background-color: #f2f3f7;
    border: 1px solid rgba(0,0,0,0.4);
    border-radius: 10px;
    &:focus{
        outline: 0;
    }
`;

const TestArea = styled.textarea`
    margin-top: 38px;
    width: 100%;
    height: 80%;
    border: none;
    resize: none;
    overflow-y: auto;
    font-family: 'Pretendard-Regular';
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  float: left;
  list-style: none;

  &::before {
    content: '|';
    margin-right: 10px;
    margin-left: 10px;
    color: rgba(0,0,0,0.2);
  }

  &:first-child::before {
    content: none;
  }

  &:last-child{
    font-size: 15px;
  }
`;

const Div = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 50px;
    box-sizing: border-box;
    font-family: 'Pretendard-Regular';
`;

const Button = styled.button`
    position: absolute;
    right:30px;
    top:30px;
    background: none;
    border: none;
    font-family: 'Pretendard-Regular';
    font-size: 30px;
    cursor: pointer;
`;

const DeleteBtn = styled.button`
    position: absolute;
    right:30px;
    bottom:30px;
    background: #ff4d3d;
    border: rgba(0,0,0,0.15);
    border-radius: 10px;
    font-family: 'Pretendard-Bold';
    font-size: 17px;
    color: white;
    cursor: pointer;
    padding: 10px 24px 10px 24px;
    &:hover{
        background-color: rgba(255, 77, 61, 0.8);
        transition: background-color 0.3s;
    }
`;

function BookReportModal({ isOpen, onRequestClose, content, id, title, date, removePost }) {
    const [isModalOpen, setModalIsOpen] = useState(false);

    const onClickDelete = () => {
        removePost(id)
        privateAxios.delete(`books/posts/${id}/`)
            .then(() => {
                onRequestClose(false);
                Swal.fire({
                    icon: "success",
                    text: "독후감이 삭제되었습니다.",
                    confirmButtonColor: "#007AFF",
                    confirmButtonText: "확인"
                });
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <ReportModal
            isOpen={isOpen}
            onRequestClose={() => onRequestClose(false)}
        >
            <Div>
                <Ul>
                    <Li>{title}</Li>
                    <Li>{date}</Li>
                </Ul>
                <TestArea disabled defaultValue={content}>
                </TestArea>
                <Button onClick={(event) => {event.stopPropagation();onRequestClose(false)}}><BsX/></Button>
                <DeleteBtn onClick={() => setModalIsOpen(true)}>삭제하기</DeleteBtn>
                <CustomModal 
                    isOpen={isModalOpen}
                    onRequestClose={setModalIsOpen}
                    del={onClickDelete}
                    msg={"삭제하시겠습니까?"}
                    content={"삭제 시 독후감을 다시 복구할 수 없습니다."}
                    yes={"삭제하기"}
                    no={"취소하기"}
                    icon={true}
                />
            </Div>
        </ReportModal>
    )
}

export default BookReportModal;