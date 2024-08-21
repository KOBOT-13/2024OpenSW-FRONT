import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { publicAxios } from '../services/axiosConfig';
import Swal from 'sweetalert2';
import {Div, H1, Line, LineWithDots, LabelInput, LabelInputButton, Apply} from './JoinStyled';

function Join() {
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");
    const [validPasswordMsg, setValidPasswordMsg] = useState("");
    const [validPassword2Msg, setValidPassword2Msg] = useState("");
    const [validEmailMsg, setValidEmailMsg] = useState("");
    const [validNicknameMsg, setValidNickname] = useState("");
    const [validDateMsg, setValidDateMsg] = useState("");

    const [isPassword, setIsPassword] = useState(false);
    const [isPassword2, setIsPassword2] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isNickname, setIsNickname] = useState(false);
    const [isDate, setIsDate] = useState(false);

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        password2: '',
        nickname: '',
        date: '',
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserInfo(userInfo => ({
            ...userInfo,
            [name]: value,
        }));
    };

    const onChangeEmail = ((e) => {
        handleInputChange(e);
        const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        const emailCurrent = e.target.value;
        setIsEmail(false);
        if (e.target.value.length === 0) {
            setValidEmailMsg("필수 입력항목입니다.");
        }
        else if (!emailRegEx.test(emailCurrent)) {
            setValidEmailMsg("이메일 형식을 지켜주세요.");
        }
        else{
            setValidEmailMsg("이메일 중복 확인을 해주세요");
            setIsEmail(true);
        }

    });

    const onChangePassword = ((e) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,32}$/;
        const passwordCurrent = e.target.value;
        handleInputChange(e);

        if (e.target.value.length === 0) {
            setValidPasswordMsg('필수 입력항목입니다.')
            setIsPassword(false)
        }
        else if (!passwordRegex.test(passwordCurrent)) {
            setValidPasswordMsg('숫자+영문자+특수문자 조합으로 8자리 이상 32자 이하로 입력해주세요!')
            setIsPassword(false)
        }
        else {
            setValidPasswordMsg('')
            setIsPassword(true)
        }

    });

    const onChangePassword2 = ((e) => {
        handleInputChange(e);
        if (userInfo.password !== e.target.value) {
            setValidPassword2Msg('비밀번호가 일치하지 않습니다.');
            setIsPassword2(false);
        }
        else {
            setValidPassword2Msg('');
            setIsPassword2(true);
        }
    });

    const onChangeNickname = ((e) => {
        handleInputChange(e);
        setIsNickname(false);
        if (e.target.value.length === 0) {
            setValidNickname("필수 입력항목입니다.");
        }
        else if (e.target.value.length < 3 || e.target.value.length > 11 ) {
            setValidNickname("닉네임은 3자에서 11자 사이로 입력해주세요.");
        }
        else{
            setValidNickname("닉네임 중복 확인을 해주세요.");
            setIsNickname(true);
        }
    });

    const onChangeDate = ((e) => {
        handleInputChange(e);
        const date_now = format(new Date(), 'yyyy-MM-dd');
        const date_user = format(new Date(e.target.value), 'yyyy-MM-dd');
        if(date_user >= date_now){
            setValidDateMsg("날짜를 다시 선택해주세요.");
        }
        else{
            setValidDateMsg("");
            setIsDate(true);
        }
    });

    const onClickCheckEmail = (() => {
        if(isEmail){
            publicAxios.post('users/check-email/',
                {
                    "email": userInfo.email
                }
            ).then((response) => {
                setValidEmailMsg(response.data.detail);
            }).catch((error) => {
                setValidEmailMsg(error.response.data.detail);
            });
        }
    });

    const onClickCheckNickname = (() => {
        if(isNickname){
            publicAxios.post('users/check-username/',
                {
                    "username": userInfo.nickname
                }
            ).then((response) => {
                setValidNickname(response.data.detail)
            }).catch((error) => {
                setValidNickname(error.response.data.detail);
            });
        }
    });

    const join = () => {
        if (isPassword && isPassword2 && isEmail && isDate && isNickname) {
            publicAxios.post(`${process.env.REACT_APP_API_ADDRESS}users/auth/registration/`,
                {
                    username: userInfo.nickname,
                    email: userInfo.email,
                    password1: userInfo.password,
                    password2: userInfo.password2,
                    birth_date: userInfo.date
                },
            )
                .then((response) => {
                    navigate("/login");
                    Swal.fire({
                        icon: "info",
                        text: "인증 이메일이 전송되었습니다.",
                        confirmButtonColor: "#007AFF",
                        confirmButtonText: "확인"
                    });
                })
                .catch((error) => {
                    console.log(error);
                    const usernameErr = error.response.data['username'];
                    const emailErr = error.response.data['email'];
                    setErrorMsg(`${usernameErr!==undefined ? usernameErr : ""}\n${emailErr!==undefined ? emailErr : ""}`);
                })
        }
        else {
            Swal.fire({
                icon: "warning",
                text: "정보를 다시 확인해주세요.",
                confirmButtonColor: "#007AFF",
                confirmButtonText: "확인"
            });
        }
    }

    return (
        <Div>
            <Div className='Top'>
                <H1>회원가입</H1>
                <LineWithDots>
                    <Line />
                </LineWithDots>
            </Div>
            <Div className='Mid'>
                <LabelInputButton label={"이메일"} onChange={onChangeEmail} onClick={onClickCheckEmail} ErrorMsg={validEmailMsg} name={'email'} />
                <LabelInputButton label={"닉네임"} onChange={onChangeNickname} onClick={onClickCheckNickname} ErrorMsg={validNicknameMsg} name={'nickname'} />
                <LabelInput label={"비밀번호"} onChange={onChangePassword} ErrorMsg={validPasswordMsg} name={'password'} type={"password"} />
                <LabelInput label={"비밀번호 확인"} onChange={onChangePassword2} ErrorMsg={validPassword2Msg} name={'password2'} type={"password"} />
                <LabelInput label={"생년월일"} onChange={onChangeDate} ErrorMsg={validDateMsg} name={'date'} type={"date"} />
            </Div>
            <Div className='Bottom'>
                <Apply onClick={join}>가입하기</Apply>
            </Div>
        </Div>
        // <div className={styles.mainContainer}>
        //     <div className={styles.joinDiv}>
        //         <div className={styles.joinFontDiv}>
        //             회원가입
        //         </div>
        //         <div className={styles.joinInfo1}>
        //             <div className={styles.emailDiv}>
        //                 <input type='text' className={styles.emailInput} placeholder='이메일' name='email' onChange={onChangeEmail} />
        //                 <button onClick={onClickCheckEmail} className={styles.checkBtn}>중복확인</button>
        //             </div>
        //             <span className={styles.validSpan}>{validEmailMsg}</span>
        //             <input type='password' className={styles.passwordInput} placeholder='비밀번호' name='password' onChange={onChangePassword} />
        //             <span className={styles.validSpan}>{validPasswordMsg}</span>
        //             <input type='password' className={styles.passwordInput} placeholder='비밀번호 확인' name='password2' onChange={onChangePassword2} />
        //             <span className={styles.validSpan}>{validPassword2Msg}</span>
        //             <div>
        //                 <input type='text' className={styles.idInput} placeholder='닉네임' name='nickname' onChange={onChangeNickname} />
        //                 <button onClick={onClickCheckNickname} className={styles.checkBtn}>중복확인</button>
        //             </div>
        //             <span className={styles.validSpan}>{validNicknameMsg}</span>
        //             <input type='date' className={styles.idInput} placeholder='생년월일' name='date' onChange={onChangeDate} />
        //             <span className={styles.validSpan}>{validDateMsg}</span>
        //         </div>
        //         <div>
        //             <pre className={styles.errorMsg}>{errorMsg}</pre>
        //             <button className={styles.joinBtn} onClick={join}><strong>회원가입</strong></button>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Join;