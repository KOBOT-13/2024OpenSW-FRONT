import Modal from "react-modal";
import styles from './CheckModal.module.css';
import styled from 'styled-components';
import { FaTrashAlt } from "react-icons/fa";

const Div = styled.div`
    &.Btns{
        width: 240px;
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
    }
`;

const Icon = styled(FaTrashAlt)`
    margin-top: 45px;
    width: 52px;
    height: 52px;
`;

const P = styled.p`
    margin: 0;
    &.title{
        font-family: 'Pretendard-Bold';
        font-size: 30px;
        margin-top: 20px;
    }
    &.content{
        font-family: 'Pretendard-Medium';
        font-size: 20px;
        color: #7a7a7a;
        margin-top: 16px;
    }
`;

const Button = styled.button`
    font-family: 'Pretendard-Bold';
    font-size: 17px;
    width: 105px;
    height: 40px;
    border-radius: 10px;
    &.Cancle{
        border: 1px solid rgba(0,0,0,0.15);
        background-color: white;
    }
    &.Delete{
        border: 1px solid rgba(0,0,0,0.15);
        background-color: #ff4d4d;
        color: white;
    }
`;

function CustomModal({ isOpen, onRequestClose, del, msg }) {
    const onClickYes = () => {
        del();
        onRequestClose(false);
    }
    const onClickNo = () => {
        onRequestClose(false);
    }
    return (
        <Modal
            isOpen={isOpen}
            className={styles.customModal}
        >
            <Icon/>
            <P className="title">삭제하시겠습니까?</P>
            <P className="content">삭제 시 댓글을 다시 복구할 수 없습니다.</P>
            <Div className="Btns">
                <Button className="Cancle" onClick={onClickNo}>취소하기</Button>
                <Button className="Delete" onClick={onClickYes}>삭제하기</Button>
            </Div>
        </Modal>

    );
}

export default CustomModal;