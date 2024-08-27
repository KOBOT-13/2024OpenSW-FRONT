import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import {privateAxios, publicAxios} from '../services/axiosConfig';
import cookies from 'js-cookie';
import {Div, H1, Line, LineWithDots, Input, Button, Ul, Li} from './LoginStyled';
import Swal from 'sweetalert2';

function Login({ setReload }) {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserInfo(userInfo => ({
            ...userInfo,
            [name]: value,
        }));
    };

    const getUserReadBook = () => {
        privateAxios.get(`books/user-read-book-list/get/`)
        .then((response) => {
            const newReadBooks = response.data.map((value) => value.book.id);
            cookies.set("read_books", JSON.stringify(newReadBooks));
        }).catch((error) => {
            console.log(error);
        });
    } 

    const login = () => {
        publicAxios.post(`users/auth/login/`,
            {
                email: userInfo.email,
                password: userInfo.password
            },
        ).then((response) => {
            const token = response.data.access;
            const refresh_token = response.data.refresh;
            const expires = new Date(new Date().getTime() + 25 * 60000);
            cookies.set('token', token);
            cookies.set('expires', expires);
            cookies.set('refresh_token', refresh_token);
            cookies.set('pk', response.data.user['pk']);
            cookies.set('email', response.data.user['email']);
            getUserReadBook();
            setReload((current) => { return !current });
            privateAxios.get(`users/profile/`)
            .then((response) => {
                    cookies.set('username', response.data.username);
                }).catch((error) => {
                    console.log(error);
                })
            Swal.fire({
                icon: "success",
                text: "로그인이 완료되었습니다.",
                confirmButtonColor: "#007AFF",
                confirmButtonText: "확인"
            });
            navigate("/");
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                text: "이메일 또는 비밀번호가 올바르지 않습니다.",
                confirmButtonColor: "#007AFF",
                confirmButtonText: "확인"
            });
        })
    }
    return (
        <Div>
            <Div className='Top'>
                <H1>로그인</H1>
                <LineWithDots>
                    <Line />
                </LineWithDots>
            </Div>
            <Div className='Mid'>
                <Input placeholder='이메일을 입력해주세요.' type='text' name='email' onChange={handleInputChange} />
                <Input placeholder='비밀번호를 입력해주세요.' type='password' name='password' onChange={handleInputChange} />
                <Button onClick={login}>로그인</Button>
                <Div className='Bottom'>
                    <Ul>
                        <Li><Link style={{textDecoration:"none", color:"#464646"}} to='/find'>비밀번호 찾기</Link></Li>
                        <Li><Link style={{textDecoration:"none", color:"#464646"}} to='/join'>회원가입</Link></Li>
                    </Ul>
                </Div>
            </Div>
        </Div>
    );
}

export default Login;