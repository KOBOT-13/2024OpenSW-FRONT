import { useEffect, useState } from 'react';
import styles from './Mypage.module.css';
import image from '../assets/profile.png';
import ProfileModifyModal from '../components/Modal/ProfileModifyModal';
import PreviousChat from '../components/PreviousChat/PreviousChat';
import cookies from 'js-cookie';
import { privateAxios } from '../services/axiosConfig';
import QuizRecord from './MypageQuizRecord';
import BookReportInfo from '../components/BookReport/BookReportInfo';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import MyComments from '../components/MyComments/MyComments';
import {Div, P, Hr, Image, Button} from './MypageStyled';
import { HiOutlinePencilSquare } from "react-icons/hi2";

function Mypage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const btns = ['내가 읽은 책', '이전 대화', '독후감', '퀴즈기록', '내가 쓴 글'];
    const nickname = cookies.get('username');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [userProfile, setUserProfile] = useState('');
    const [reload, setReload] = useState(false);
    const [reloadPost, setReloadPost] = useState(false);
    const [reportInfo, setReportInfo] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [comments, setComments] = useState([]);
    const [readBooks, setReadBooks] = useState([]);
    const navigate = useNavigate();
    const imgs = {
        2: { img: `${process.env.REACT_APP_ADDRESS}/media/book_covers/1.jpg`, title: "백설공주" },
        4: { img: `${process.env.REACT_APP_ADDRESS}/media/book_covers/5.jpg`, title: "흥부와 놀부" },
        3: { img: `${process.env.REACT_APP_ADDRESS}/media/book_covers/3.jpg`, title: "피터팬" },
        5: { img: `${process.env.REACT_APP_ADDRESS}/media/book_covers/4.jpeg`, title: "헨젤과 그레텔" },
        1: { img: `${process.env.REACT_APP_ADDRESS}/media/book_covers/2.jpg`, title: "아기 돼지 삼형제" }
    }

    useEffect(() => {
        const userInfoFetch = async () => {
            await privateAxios.get(`users/profile/`)
                .then((response) => {
                    setDate(response.data.birth_date);
                    setEmail(response.data.email);
                    setUserProfile(response.data.profile_image);
                }).catch((error) => {
                    console.log(error);
                });
        }
        userInfoFetch();
    }, [reload]);

    useEffect(() => {
        const getPosts = () => {
            privateAxios.get(`books/my_posts`)
                .then((response) => {
                    setReportInfo(response.data);
                }).catch((error) => {
                    console.log(error);
                });
        }
        getPosts();
    }, [reloadPost])

    useEffect(() => {
        privateAxios.get(`books/user-read-book-list/get/`)
        .then((response) => {
            setReadBooks(response.data);
        })        
    }, []);

    useEffect(() => {
        privateAxios.get(`dialogs/conversation/`)
            .then(response => { 
                console.log(response.data)
                const sortedConversations = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                setConversations(sortedConversations);
            })

    }, []);

    useEffect(() => {
        privateAxios.get('books/comments')
            .then(response => {
                setComments(response.data);
            })
    }, []);

    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };

    const onClickProfile = () => {
        setIsOpen(true);
    }

    const chatlistclick = (id, characterid) => {
        navigate(`/bookclick/${id}/chatcharchoose/${characterid}/chat`);
    };

    return (
        <Div className='Main'>
            <Div className='Top'>
                <Div className='Profile-Container'>
                    <Image src={`${process.env.REACT_APP_ADDRESS}${userProfile}`} />
                    <Div className='UserInfo'>
                        <P className='nickname'>{nickname} 님</P>
                        <Hr/>
                        <P className='date'>생년월일 : {date}</P>
                        <P className='email'>Email : {email}</P>
                    </Div>
                </Div>
                <Div className='Modify-Btn' onClick={onClickProfile}>
                    <HiOutlinePencilSquare/>
                    <P className='profile-modify'>프로필 수정</P>
                </Div>
                <ProfileModifyModal reload={setReload} date={date} nickname={nickname} isOpen={isOpen} onRequestClose={setIsOpen} />
            </Div>
        </Div>
        // <div className={styles.mainContainer}>
        //     <div className={styles.profileDiv} onClick={onClickProfile}>
        //         <img src={image} className={styles.profileImg} />
        //         <div className={styles.userInfoDiv}>
        //             <p className={styles.profileP}><u>{nickname}</u>님 안녕하세요.</p>
        //             <p className={styles.profileP}>생년월일 : {date}</p>
        //             <p className={styles.profileP}>E-mail : {email}</p>
        //         </div>
        //     </div>
            // <ProfileModifyModal reload={setReload} date={date} nickname={nickname} isOpen={isOpen} onRequestClose={setIsOpen} />
        //     <div className={styles.myReadActDiv}>
        //         <h3 style={{ marginBottom: "0" }}>나의 독후활동</h3>
        //         <div className={styles.btnsDiv}>
        //             {btns.map((label, index) => (
        //                 <button
        //                     key={index}
        //                     className={`${styles['btn']} ${activeIndex === index ? styles['active'] : ''}`}
        //                     onClick={() => handleButtonClick(index)}
        //                 >
        //                     {label}
        //                 </button>
        //             ))}
        //         </div>
        //         <hr />
        //         <div className={styles.readActDiv}>
        //             {
        //                 activeIndex === 0 ? 
        //                     readBooks.map((value, key) => {
        //                         console.log(value);
        //                         return <BookReportInfo key={key} id={value.id} imageSrc={imgs[value.book.id].img} title={imgs[value.book.id].title} reviewDate={value.read_date} />
        //                     })
        //                     : activeIndex === 1 ? <PreviousChat conversations={conversations} onChatClick={chatlistclick} />    
        //                         : activeIndex === 2 ?
        //                             reportInfo.map((value, key) => {
        //                                 return <BookReportInfo key={key} id={value.id} imageSrc={imgs[value.book].img} title={imgs[value.book].title} reviewDate={format(value.post_date, "yyyy-MM-dd")} content={value.body} setReload={setReloadPost} />
        //                             })
        //                             : activeIndex === 3 ? <QuizRecord/>
        //                                 : activeIndex === 4 ? <MyComments comments={comments} />
        //                                     : <div>4</div>
        //             }
        //         </div>

        //     </div>
        // </div>
    )
}

export default Mypage;