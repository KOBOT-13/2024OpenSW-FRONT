import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {privateAxios} from '../services/axiosConfig';
import cookies from 'js-cookie';
import CustomModal from '../components/Modal/CheckModal';

function Logout({setReload}) {
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [isLogout, setIsLogout] = useState(undefined);

    useEffect(() => {
        if(isLogout){
            const logoutAPI = async() => {
                privateAxios.post(`users/auth/logout/`, 
                    {
                        refresh: cookies.get('refresh_token')
                    },
                ).then((response) => {
                    cookies.remove('token');
                    cookies.remove('refresh_token');
                    cookies.remove('username');
                    cookies.remove('pk');
                    cookies.remove('expires');
                    navigate('/');
                    alert("로그아웃 되었습니다.");
                    setReload((current) => { return !current });
                }).catch((error) => {
                    console.log(error);
                })
            }
            logoutAPI();
        }
        else if(isLogout === false){
            console.log(isLogout);
            navigate('/');
        }
    }, [isLogout]);
    
    return (
        <div>
            <CustomModal isOpen={modalIsOpen} onRequestClose={setModalIsOpen} del={() => setIsLogout(true)} msg={"정말로 로그아웃 하시겠습니까?"} />
        </div>
    )
}

export default Logout;