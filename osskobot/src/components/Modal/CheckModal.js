import Modal from "react-modal";
import styles from './CheckModal.module.css';
import styled from 'styled-components';
import { FaTrashAlt } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";

const Div = styled.div`
    &.Btns{
        width: 240px;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
    }
`;

const DeleteIcon = styled(FaTrashAlt)`
    margin-top: 45px;
    width: 42px;
    height: 42px;
`;

const LogoutIcon = styled(IoLogOutSharp)`
    margin-top: 45px;
    width: 42px;
    height: 42px;
`;

const P = styled.p`
    margin: 0;
    &.title{
        font-family: 'Pretendard-SemiBold';
        font-size: 25px;
        margin-top: 20px;
    }
    &.content{
        font-family: 'Pretendard-Medium';
        font-size: 16px;
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

function CustomModal({ isOpen, icon, onRequestClose, del, msg, content, yes, no }) {
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
            {icon ? <DeleteIcon/> : <LogoutIcon/>}
            <P className="title">{msg}</P>
            <P className="content">{content}</P>
            <Div className="Btns">
                <Button className="Cancle" onClick={onClickNo}>{no}</Button>
                <Button className="Delete" onClick={onClickYes}>{yes}</Button>
            </Div>
        </Modal>

    );
}

export default CustomModal;