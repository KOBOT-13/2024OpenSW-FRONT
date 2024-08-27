import axios from 'axios';
import cookies from 'js-cookie';
import refreshToken from './refreshToken';
import Swal from 'sweetalert2';

const privateAxios = axios.create({
  baseURL: process.env.REACT_APP_API_ADDRESS,
  headers: {
    Authorization: `Bearer ${cookies.get('token')}`
  }
});

privateAxios.interceptors.request.use(
  async (config) => {
    let token = cookies.get('token');
    if (token) {
      const expiryTime = new Date(cookies.get('expires'));
      if (expiryTime <= new Date()) {
        token = refreshToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          Swal.fire({
            icon: "error",
            text: "세션에 문제가 발생하였습니다. 다시 로그인해 주세요.",
            confirmButtonColor: "#007AFF",
            confirmButtonText: "확인"
        });
          cookies.remove('token');
          cookies.remove('refresh_token');
          cookies.remove('username');
          cookies.remove('pk');
          cookies.remove('expires');
          window.location.href = '/login';
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const publicAxios = axios.create({
    baseURL: process.env.REACT_APP_API_ADDRESS,
    headers: {
        'Content-Type': 'application/json',
    },
});

export {privateAxios, publicAxios};
