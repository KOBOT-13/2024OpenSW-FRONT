import { useEffect, useState } from 'react';
import styles from './ProfileModifyModal.module.css';
import Modal from 'react-modal';
import { privateAxios, publicAxios } from '../../services/axiosConfig';
import styled from 'styled-components';
import cookies from 'js-cookie';
import { IoCalendarNumberOutline } from "react-icons/io5";

const ErrorSpan = styled.span`
    font-family: 'Pretendard-Medium';
    font-size: 10px;
    color: #ff4040;
    position: absolute;
    top: 25px;
`;

const H1 = styled.h1`
    position: absolute; 
    left: 50px;
    top: 60px;
    font-family: 'Pretendard-Bold';
    font-size: 35px;
    margin: 0;
`;

const Div = styled.div`
    &.Modify-Container{
        display: flex;
        align-items: center;
    }
    &.Modify-Input{
        position: relative;
        display: flex;
        flex-direction: column;
    }
    &.Nickname{
        position: absolute;
        left: 137px;
        top: 134px;
    }
    &.Date{
        position: absolute;
        left: 119px;
        top: 190px;
    }
    &.Password{
        display: flex;
        align-items: center;
        position: absolute;
        left: 78px;
        top: 244px;
    }
`;

const P = styled.p`
    margin: 0;
    margin-right: 36px;
    font-family: 'Pretendard-Medium';
    font-size: 21px;
    color: #696969;
`;

const Input = styled.input`
    &:focus{
        outline: 0;
    }
    font-family: 'Pretendard-Medium';
    font-size: 18px;
    width: 340px;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid black;
    background-color: #f2f3f7;
`;

const Button = styled.button`
    &.EmailBtn{
        font-family: 'Pretendard-Medium';
        font-size: 12px;
        background-color: white;
        border: 1px solid rgba(0,0,0,0.15);
        border-radius: 10px;
        width: 75px;
        height: 26px;
        position: absolute;
        left: 416px;
        top: -7px;
    }
    &.CancleBtn{
        font-family: 'Pretendard-Bold';
        font-size: 17px;
        width: 107px;
        height: 40px;
        background-color: white;
        border: 1px solid rgba(0,0,0,0.15);
        border-radius: 10px;
        position: absolute;
        left: 442px;
        top: 324px;
    }
    &.EditBtn{
        font-family: 'Pretendard-Bold';
        font-size: 17px;
        color: white;
        width: 107px;
        height: 40px;
        background-color: Black;
        border: 1px solid rgba(0,0,0,0.15);
        border-radius: 10px;
        position: absolute;
        left: 564px;
        top: 324px;
    }
    
    &:hover{
        background-color: #e0e0e0;
    }
`;


function LabelContent({ label, type, placeholder, value, onChange, errorMsg }) {
    return (
        <Div className='Modify-Container'>
            <P>{label}</P>
            <Div className='Modify-Input'>
                <Input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <ErrorSpan>{errorMsg}</ErrorSpan>
            </Div>
        </Div>
    )
}

function ProfileModify({ isOpen, onRequestClose, nickname, date, reload }) {
    const [newNickName, setNewNickName] = useState('');
    const [newDate, setNewDate] = useState('');
    const [email, setEmail] = useState('');
    const [emailValidMsg, setEmailValidMsg] = useState('');
    const [dateValidMsg, setDateValidMsg] = useState('');
    const [passwordMsg, setPasswordMsg] = useState('');

    useEffect(() => {
        setNewNickName(nickname);
        setNewDate(date);
    }, [nickname, date])

    const onClickApply = () => {
        if(newNickName === nickname){
            privateAxios.patch(`users/profile/update/`,
                {
                    'birth_date': newDate
                }
            ).then((response) => {
                alert("프로필을 수정하였습니다.");
                reload((current) => {return !current});
            }).catch((error) => {
                console.log(error);
            });
        } else{
            publicAxios.post('users/check-username/',
                {
                    "username": newNickName
                }
            ).then((response) => {
                privateAxios.patch(`users/profile/update/`,
                    {
                        'username': newNickName,
                        'birth_date': newDate
                    }
                ).then((response) => {
                    alert("프로필을 수정하였습니다.");
                    cookies.set("username", newNickName);
                    reload((current) => {return !current});
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                setEmailValidMsg(error.response.data.detail)
            });
        }
    }
 
    const onClickEmailValidate = () => {
        console.log(cookies.get('email'))
        if(cookies.get('email') === email){
            publicAxios.post(`users/password_reset/`, 
                {
                    "email" : email
                }
            ).then(() => {
                alert("비밀번호 변경 이메일이 전송되었습니다.");
                setPasswordMsg("");
            }).catch((error) => {
                setPasswordMsg(error.response.data.detail);
            })
        }else{
            setPasswordMsg('로그인 된 계정의 이메일을 입력해주세요.');
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => onRequestClose(false)}
            className={styles.profileModal}
        >
            <H1>프로필 수정</H1>
            <Div className='Nickname'>
                <LabelContent label={"닉네임"} type={"text"} placeholder={nickname} value={newNickName} onChange={setNewNickName} errorMsg={emailValidMsg} />
            </Div>
            <Div className='Date'>
                <LabelContent label={"생년월일"} type={"date"} value={newDate} onChange={setNewDate} errorMsg={dateValidMsg} />
            </Div>
            <Div className='Password'>
                <P>비밀번호 변경</P>
                <Div className='Modify-Input'>
                    <Input
                        placeholder='이메일을 입력해주세요.'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <ErrorSpan>{passwordMsg}</ErrorSpan>
                </Div>
                <Button className='EmailBtn' onClick={onClickEmailValidate}>이메일 인증</Button>
            </Div>
            <Button className='CancleBtn' onClick={() => {setEmailValidMsg('');setDateValidMsg('');setPasswordMsg('');onRequestClose(false)}}>취소하기</Button>
            <Button className='EditBtn' onClick={onClickApply}>수정하기</Button>
        </Modal>
    )
}

export default ProfileModify;