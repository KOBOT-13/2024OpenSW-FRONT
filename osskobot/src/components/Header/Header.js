import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EndChat from '../ChatMsg/EndChat';
import { useConversation } from '../ChatMsg/ConversationContext';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Arrow } from "../../assets/Arrow.svg";
import BookRequest from '../Modal/BookRequestModal';
import { useState, useEffect } from 'react';
import CustomModal from '../Modal/CheckModal';
import cookies from 'js-cookie';
import { privateAxios } from '../../services/axiosConfig';
import Swal from 'sweetalert2';

const Div = styled.div`
    &.BG1440{
        height: 100px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    &.BG{
        height: 100px;
        width: 1440px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &.Left{
        height: 30px;
        display:flex;
        align-items: center;
    }
    &.Right{
        display: flex;
        width: 280px;
        height: 30px;
        align-items: center;
        justify-content: space-between;
    }
    &.CI {
        display: flex;
        align-items: center;
        margin-right: 30px;
    }
    &.Menu{
        display: flex;
    }
    &.SearchContainer{
        display: flex;
        align-items: center;
        background-color: #f1f1f1;
        border-radius: 500px;
        width: 320px;
        height: 40px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        
    }
    &.BookApplyContainer{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        background-color: #f5f7fd;
        border-radius: 500px;
        padding-left: 24px;
        padding-right: 24px;
        &:hover {
            background-color: rgba(48, 99, 210, 0.2);
            transition: background-color 0.3s;
        }
        cursor: pointer;
    }
`

const P = styled.p`
    margin: 0;
    font-family: 'Pretendard-Medium';
    font-size: 14px;
    user-select: none;
    cursor: pointer;
    &.title{
        font-family: 'Pretendard-SemiBold';
        font-size: 30px;
        margin-left: 5px;
    }
    &.service-intro{
        font-family: 'Pretendard-Bold';
        font-size: 16px;
    }
    &.BookApply{
        margin-right: 20px;
        color: #3063D2;
    }
`;

const Input = styled.input`
    border: none;
    background: none;
    outline: none;
    width: 100%;
    font-size: 16px;
    color: #333;
    ::placeholder {
        color: #aaa;
    }
`;

const Ul = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-family: 'Pretendard-Bold';
    font-size: 16px;
`;

const Li = styled.li`
    float: left;
    list-style: none;
    margin-left: 30px;
    user-select: none;
    cursor: pointer;

    &.Test{
        display: flex;
        align-items: center;
    }

    &::before {
        content: '|';
        padding-right: 30px;
        font-family: 'Pretendard-Regular';
    }

    &:first-child::before {
        content: none;
    }
`;

const SearchIcon = styled(Search)`
    margin-left: 30px;
    color: #0E202A;
    font-size: 20px;
    margin-right: 10px;
`
const CustomLink = styled(Link)`
    text-decoration: none;
    color: black;
`

function Header(props) {
    const { isLogin, setSearchQuery, setReload, searchQuery } = props;
    const location = useLocation();
    const { conversationid } = useConversation();
    const [isOpen, setIsOpen] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLogout, setIsLogout] = useState(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        if(isLogout){
            privateAxios.post(`users/auth/logout/`, 
                {
                    refresh: cookies.get('refresh_token')
                },
            ).then(() => {
                cookies.remove('token');
                cookies.remove('refresh_token');
                cookies.remove('username');
                cookies.remove('pk');
                cookies.remove('expires');
                navigate('/');
                Swal.fire({
                    icon: "success",
                    text: "로그아웃이 완료되었습니다.",
                    confirmButtonColor: "#007AFF",
                    confirmButtonText: "확인"
                });
                setIsLogout(undefined);
                setReload((current) => { return !current });
            }).catch((error) => {
                console.log(error);
            })
        }
        else if(isLogout === false){
            navigate('/');
        }
    }, [isLogout]);

    const handleChatEndBtn = () => {
        if (location.pathname.startsWith('/bookclick/') && location.pathname.includes('/chat')) {
            EndChat(conversationid)
        }
    }
    
    return (
        <header>
            <Div className='BG1440'>
                <Div className='BG'>
                    <Div className='Left'>
                        <CustomLink to="/" onClick={handleChatEndBtn}>
                            <Div className='CI'>
                                <Logo />
                                <P className='title'>아이랑 아이(AI)랑</P>
                            </Div>
                        </CustomLink>
                        <Div className='Menu'>
                            <Ul className='content'>
                                <Li onClick={() => setIsOpen(true)}>도서 신청하기</Li>
                                <Li onClick={() => {navigate(`/writeabook`)}}>내가 작가 되어보기</Li>
                                <Li className='Test'>
                                    <Div className='SearchContainer'>
                                        <SearchIcon />
                                        <Input placeholder='도서검색' onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
                                    </Div>
                                </Li>
                            </Ul>
                        </Div>
                    </Div>
                    {
                        isLogin ?
                            <Div className='Right'>
                                <P className='Login' onClick={() => setModalIsOpen(true)}>로그아웃</P>
                                <CustomModal
                                    isOpen={modalIsOpen}
                                    onRequestClose={setModalIsOpen}
                                    del={() => setIsLogout(true)}
                                    msg={"로그아웃 하시겠습니까?"}
                                    yes={"로그아웃"}
                                    no={"취소"}
                                    Icon={false}
                                />
                                <CustomLink to='/mypage'><P className='Join'>마이페이지</P></CustomLink>
                                <Div className='BookApplyContainer' onClick={() => navigate(`/serviceinfo`)}>
                                    <P className='BookApply'>서비스 소개</P>
                                    <Arrow />
                                </Div>
                                <BookRequest isOpen={isOpen} onRequestClose={setIsOpen} />
                            </Div>
                            :
                            <Div className='Right'>
                                <CustomLink to='/login'><P className='Login'>로그인</P></CustomLink>
                                <CustomLink to='/join'><P className='Join'>회원가입</P></CustomLink>
                                <Div className='BookApplyContainer'>
                                    <P className='BookApply'>도서 신청하기</P>
                                    <Arrow />
                                </Div>
                            </Div>
                    }
                </Div>
            </Div>
        </header>
    )
}

export default Header;