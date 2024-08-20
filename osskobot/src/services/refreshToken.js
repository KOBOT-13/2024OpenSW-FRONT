import {publicAxios} from "./axiosConfig";
import cookies from 'js-cookie';

const refreshToken = () => {
    publicAxios.post(`users/auth/token/refresh/`, 
        {
            'refresh': cookies.get('refresh_token')
        }
    ).then((response) => {
        const { access, refresh } = response.data;
        const expires = new Date(new Date().getTime() + 25 * 60000);
        cookies.set('token', access);
        cookies.set('refresh_token', refresh);
        cookies.set('expires', expires);
    
        return access;
    }).catch((error) => {
        console.log(error);
    })
}

export default refreshToken;