import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {privateAxios} from '../../services/axiosConfig';
import Cookies from 'js-cookie';
import refreshToken from '../../services/refreshToken';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ setReload, children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('token');

        const checkLoginStatus = async () => {
            await privateAxios.post(`users/auth/token/verify/`, {
                token: token
            }).then((response) => {
                setIsLogin(true);
                setLoading(false);
            }).catch((error) => {
                refreshToken();
                setIsLogin(true);
                setLoading(false);
            });
        };

        if(token){
            checkLoginStatus();
        }
        else{
            Swal.fire({
                icon: "info",
                text: "로그인 후 이용 가능한 서비스입니다.",
                confirmButtonColor: "#007AFF",
                confirmButtonText: "확인"
            });
            navigate('/login');
            setIsLogin(false);
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isLogin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
