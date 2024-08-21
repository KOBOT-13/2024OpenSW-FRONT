import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicAxios } from "../services/axiosConfig";
import Swal from "sweetalert2";

const Container = styled.div`
    height: 163px;
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
  background-color: rgba(48, 99, 210, 1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(48, 99, 210, 0.5);
  }
`;

const Div = styled.div`
    height: 45vh;
    display: flex;
    justify-content: center;
    align-items: center;
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
            Swal.fire({
                icon: "waring",
                text: "회원가입되지 않은 계정입니다.",
                confirmButtonColor: "#007AFF",
                confirmButtonText: "확인"
            });
        }).catch((error) => {
            publicAxios.post(`users/password_reset/`,
                {
                    "email" : email
                }
            ).then(() => {
                Swal.fire({
                    icon: "info",
                    text: "비밀번호 변경 이메일이 전송되었습니다.",
                    confirmButtonColor: "#007AFF",
                    confirmButtonText: "확인"
                });
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
            });
        });
    };

    return (
        <Div>
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
        </Div>
    )
}

export default Find;