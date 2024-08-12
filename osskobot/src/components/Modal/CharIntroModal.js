import Modal from "react-modal";
import styles from './CharIntroModal.module.css';
import { IoExit } from "react-icons/io5";
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function CharIntroModal({ isOpen, onRequestClose, name, description, src, mode, content, characterid }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const onClickExitBtn = () => {
        onRequestClose(false);
    }

    const onClickTalkBtn = () => {
        onRequestClose(false);
        navigate(`/bookclick/${id}/chatcharchoose/${characterid}/chat`);
    }


    if (mode === 1) {
        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={() => onRequestClose(false)}
                className={styles.charModal}
            >
                <img src={src} className={styles.modalImg} />
                <div className={styles.contentDiv}>
                    <div className={styles.nameDiv}>
                        <p className={styles.name}><strong>{"이름 : "}</strong>{name}</p>
                    </div>
                    <div className={styles.descriptionDiv}>
                        <p className={styles.description}><strong>{"설명 : "}</strong>{description}</p>
                    </div>
                </div>
                <button onClick={onClickExitBtn} className={styles.exitBtn}><IoExit size={25} /></button>
            </Modal>
        )
    }
    else if (mode === 2) {
        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={() => onRequestClose(false)}
                className={styles.talkModal}
                overlayClassName={styles.customOverlay}
            >
                <div className={styles.imgDiv}>
                    <img src={src} className={styles.modalImg} />
                    <p className={styles.name}>{name}</p>
                </div>
                <div className={styles.contentDiv}>
                    <p className={styles.content}>{content}</p>
                </div>
                <div className={styles.talkDiv}>
                    <button className={styles.talkBtn} onClick={onClickTalkBtn}>
                        <strong>대화하기</strong>
                    </button>
                </div>
            </Modal>
        )
    }
}

export default CharIntroModal;