import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicAxios } from "../services/axiosConfig";

const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    background-color: #f9f9f9;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 30px;
  color: #333;
`;

const Input = styled.input`
  width: 80%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  width: 84%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

function Find() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    // 이메일 입력 이벤트 핸들러
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // 확인 버튼 클릭 이벤트 핸들러
    const handleSubmit = async () => {
        await publicAxios.post(`users/check-email/`,
            {
                "email" : email
            }
        ).then((response) => {
            alert("회원가입되지 않은 계정입니다.");
        }).catch(async(error) => {
            await publicAxios.post(`users/password_reset/`,
                {
                    "email" : email
                }
            ).then(() => {
                alert("비밀번호 변경 이메일이 전송되었습니다.");
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
            });
        });
    };

    return (
        <Container>
            <Title>비밀번호 변경</Title>
            <Input
                type="email"
                placeholder="이메일 입력"
                value={email}
                onChange={handleEmailChange}
            />
            <Button onClick={handleSubmit}>확인</Button>
        </Container>
    )
}

export default Find;