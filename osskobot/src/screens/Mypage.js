import { useEffect, useState } from 'react';
import styles from './Mypage.module.css';
import image from '../assets/profile.png';
import ProfileModifyModal from '../components/Modal/ProfileModifyModal';
import PreviousChat from '../components/PreviousChat/PreviousChat';
import cookies from 'js-cookie';
import { privateAxios, publicAxios } from '../services/axiosConfig';
import QuizRecord from './MypageQuizRecord';
import BookReportInfo from '../components/BookReport/BookReportInfo';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import MyComments from '../components/MyComments/MyComments';
import {Div, P, Hr, Image, Button} from './MypageStyled';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import BottomBorderBtn from '../components/CustomButton/BottomBorderBtn';
import CommentBoard from '../components/CommentBoard/CommentBoard';
import { CommentsPage } from './BookClickStyled';
import Book from '../components/Book/Book';

function Mypage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const nickname = cookies.get('username');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [userProfile, setUserProfile] = useState('');
    const [reload, setReload] = useState(false);
    const [reloadPost, setReloadPost] = useState(false);
    const [reportInfo, setReportInfo] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [comments, setComments] = useState([]);
    const [wishBook, setWishBook] = useState([]);
    const [allBooks, setAllBooks] = useState([]);

    const navigate = useNavigate();
    const [index, setIndex] = useState(1);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentComments = comments.slice(indexOfFirstItem, indexOfLastItem);

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
        privateAxios.get(`books/my_posts`)
        .then((response) => {
            console.log(response.data);
            setReportInfo(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [reloadPost])

    useEffect(() => {
        privateAxios.get(`books/wishlist/`)
        .then((response) => {
            console.log(response.data);
            setWishBook(response.data);
        }).catch((error) => {
            console.log(error);
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
        privateAxios.get('books/my_comments')
            .then(response => {
                setComments(response.data);
            })
    }, []);

    useEffect(() => {
        publicAxios.get('books/AllBooks')
        .then((response) => {
            console.log(response.data);
            setAllBooks(response.data);
        }).catch((error) => {
            console.log(error);
        });
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

    const removeComment = (id) => {
        const updatedComments = comments.filter(commnet => commnet.id !== id);
        setComments(updatedComments);
    };

    const bottomBtn = [
        { index: 1, label: "나중에 읽을 책" },
        { index: 2, label: "이전 대화 내용 보기" },
        { index: 3, label: "작성한 독후감" },
        { index: 4, label: "퀴즈 기록 보기" },
        { index: 5, label: "내가 쓴 댓글" },
    ];

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
            <Div className='Mid'>
                <Div className='Mid-Btns'>
                    {bottomBtn.map((value, key) => {
                        return <BottomBorderBtn label={value.label} index={value.index === index} onClick={() => setIndex(value.index)} />
                    })}
                </Div>
                <Div className='Active'>
                    {
                        index === 1 ?
                            <Div className='WishList'>
                                {wishBook.map((value, key) => {
                                    return <Book key={key} title={value.title} author={value.author} id={value.id} cover_image={value.cover_image} isWish={true} />
                                })}
                            </Div>
                        :index === 2 ? 
                            <Div>
                                
                            </Div>
                        :index === 3 ? 
                            <Div className='BookReport'>
                                {reportInfo.map((value, key) => {
                                    return <BookReportInfo id={value.id} title={allBooks[value.book+1].title} content={value.body} reviewDate={format(value.post_date, 'yy-MM-dd HH:mm')} />
                                })}
                            </Div>
                        :index === 4 ? <Div></Div>
                                        :
                                        <Div className='Comment-Written'>
                                            <Div className='Comments'>
                                                {currentComments.map((value) => {
                                                    return <CommentBoard
                                                        key={value.id}
                                                        id={value.id}
                                                        nickname={value.user}
                                                        comment={value.content}
                                                        date={format(new Date(value.created_at), 'yyyy-MM-dd h:mm a')}
                                                        likes={value.likes_count}
                                                        onLikes={value.likes.includes(parseInt(cookies.get('pk')))}
                                                        isMine={value.user === cookies.get('username')}
                                                        delCommnet={removeComment}
                                                    />
                                                })}
                                            </Div>
                                            <CommentsPage
                                                activePage={page}
                                                itemsCountPerPage={itemsPerPage}
                                                totalItemsCount={comments.length}
                                                pageRangeDisplayed={10}
                                                prevPageText={"<"}
                                                nextPageText={">"}
                                                onChange={handlePageChange}
                                            />
                                        </Div>
                    }
                </Div>
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