import { useState } from 'react';
import styles from './BookRequestModal.module.css';
import Modal from 'react-modal';
import axios from 'axios';
import { privateAxios } from '../../services/axiosConfig';
import cookies from 'js-cookie';
import * as styled from './BookRequestModalStyled';

function LabelContent({ label, placeholder, value, onChange }) {
    const [activeBorder, setActiveBorder] = useState({
        labelBorder: false,
    });
    const { labelBorder } = activeBorder;
    const handleFocusBorder = border => {
        setActiveBorder({
            ...activeBorder,
            [border]: true,
        });
    };
    const handleBlurBorder = border => {
        setActiveBorder({
            ...activeBorder,
            [border]: false,
        });
    };
    return (
        <div className={styles.labelContentDiv}>
            <p
                className={`${styles['label']} ${labelBorder ? styles['active'] : ''}`}
            >
                {label}
            </p>
            <input
                type={"text"}
                className={`${styles['content']} ${labelBorder ? styles['active'] : ''}`}
                onFocus={() => handleFocusBorder('labelBorder')}
                onBlur={() => handleBlurBorder('labelBorder')}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div >
    )
}

function BookRequest({isOpen, onRequestClose}) {
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [characters, setCharacters] = useState('');

    const onClickApply = () => {
        if(bookName.length === 0 || author.length === 0){
            alert("책 제목 / 저자는 필수입니다.");
            return;
        }
        privateAxios.post(`books/book_requests/`, 
            {
                "title": bookName,
                "author": author,
                "publisher": publisher,
                "character": characters
            },
        ).then((response) => {
            console.log(response);
            alert("신청되었습니다.");
        }).catch((error) => {
            console.log(error);
            alert("실패");
        })
        setBookName('');
        setAuthor('');
        setPublisher('');
        setCharacters('');
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => onRequestClose(false)}
            className={styles.bookRequestModal}
        >
            <styled.H1>도서 신청하기</styled.H1>
            <styled.Button onClick={() => onRequestClose(false)}>X</styled.Button>
            <styled.Div className='BookName'>
                <LabelContent label={"책 제목"} placeholder={"책 제목을 입력해주세요."} value={bookName} onChange={setBookName} />
            </styled.Div>
            <styled.Div className='Author'>
                <LabelContent label={"저자"} placeholder={"저자를 입력해주세요."} value={author} onChange={setAuthor} />
            </styled.Div>
            <styled.Div className='Publisher'>
                <LabelContent label={"출판사"} placeholder={"출판사를 입력해주세요."} value={publisher} onChange={setPublisher} />
            </styled.Div>
            <styled.Div className='Character'>
                <LabelContent label={"대화하고 싶은 등장인물"} placeholder={"대화하고 싶은 인물을 입력해주세요."} value={characters} onChange={setCharacters} />
            </styled.Div>
            <styled.Apply onClick={onClickApply}>
                신청하기
            </styled.Apply>
        </Modal>
    )
}

export default BookRequest;