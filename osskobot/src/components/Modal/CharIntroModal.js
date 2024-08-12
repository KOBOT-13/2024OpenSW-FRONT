import Modal from "react-modal";
import styles from './CharIntroModal.module.css';
import { IoExit } from "react-icons/io5";
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function CharIntroModal({ isOpen, onRequestClose, name, description, src, mode }) {

    const onClickExitBtn = () => {
        onRequestClose(false);
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
}

export default CharIntroModal;