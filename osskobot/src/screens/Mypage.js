import { useEffect, useState } from 'react';
import ProfileModifyModal from '../components/Modal/ProfileModifyModal';
import cookies from 'js-cookie';
import { privateAxios, publicAxios } from '../services/axiosConfig';
import BookReportInfo from '../components/BookReport/BookReportInfo';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {Div, P, Hr, Image, Logo} from './MypageStyled';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import BottomBorderBtn from '../components/CustomButton/BottomBorderBtn';
import CommentBoard from '../components/CommentBoard/CommentBoard';
import { CommentsPage } from './BookClickStyled';
import Book from '../components/Book/Book';
import QuizRecordComponent from '../components/Quiz/QuizRecord';
import CharCard from '../components/CharProfile/CharCard';
import { FaUserAltSlash } from "react-icons/fa";
import CustomModal from '../components/Modal/CheckModal';
import Swal from 'sweetalert2';

function Mypage({homeReload}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isCheckOpen, setIsCheckOpen] = useState(false);
    const nickname = cookies.get('username');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [userProfile, setUserProfile] = useState('');
    const [reload, setReload] = useState(false);
    const [reloadPost, setReloadPost] = useState(false);
    const [reportInfo, setReportInfo] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [quizRecords, setQuizRecords] = useState([]);
    const [comments, setComments] = useState([]);
    const [wishBook, setWishBook] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [allChars, setAllChars] = useState([]);
    const [isEmpty, setIsEmpty] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
    })

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
            if(response.data.length != 0){
                setIsEmpty(prev => ({...prev, 3:true}));
            }
            setReportInfo(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [reloadPost])

    useEffect(() => {
        privateAxios.get(`books/wishlist/`)
        .then((response) => {
            if(response.data.length != 0){
                setIsEmpty(prev => ({...prev, 1:true}));
            }
            setWishBook(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        privateAxios.get(`dialogs/conversation/`)
            .then(response => { 
                if(response.data.length != 0){
                    setIsEmpty(prev => ({...prev, 2:true}));
                }
                const sortedConversations = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                setConversations(sortedConversations);
            })

    }, []);

    useEffect(() => {
        privateAxios.get(`mypages/quizRecord`)
            .then(response => { 
                if(response.data.length != 0){
                    setIsEmpty(prev => ({...prev, 4:true}));
                }
                setQuizRecords(response.data);
            })

    }, []);

    useEffect(() => {
        privateAxios.get('books/my_comments')
            .then(response => {
                if(response.data.length != 0){
                    setIsEmpty(prev => ({...prev, 5:true}));
                }
                setComments(response.data);
            })
    }, []);

    useEffect(() => {
        publicAxios.get('books/AllBooks')
        .then((response) => {
            setAllBooks(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        publicAxios.get('books/character/')
        .then((response) => {
            setAllChars(response.data);
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

    const removePost = (id) => {
        const updatedPost = reportInfo.filter(post => post.id !== id);
        setReportInfo(updatedPost);
    };

    const onClickDelete = () => {
        privateAxios.delete(`users/delete_account/`)
        .then(() => {
            Swal.fire({
                icon: "success",
                text: "계정이 삭제되었습니다.",
                confirmButtonColor: "#007AFF",
                confirmButtonText: "확인"
            });
            const allCookies = cookies.get();
            for(let cookie in allCookies){
                cookies.remove(cookie);
            }
            navigate('/');
            homeReload(cur => !cur);
        })
    };

    const bottomBtn = [
        { index: 1, label: "나중에 읽을 책" },
        { index: 2, label: "이전 대화 내용 보기" },
        { index: 3, label: "작성한 독후감" },
        { index: 4, label: "퀴즈 기록 보기" },
        { index: 5, label: "내가 쓴 댓글" },
        { index: 6, label: "내가 쓴 책" },
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
                <Div className='Delete-Btn' onClick={() => setIsCheckOpen(true)}>
                    <FaUserAltSlash/>
                    <P className='profile-delete'>회원 탈퇴</P>
                </Div>
                <CustomModal isOpen={isCheckOpen} icon={true} onRequestClose={setIsCheckOpen} del={onClickDelete} msg={"정말로 삭제하시겠습니까?"} content={"삭제 시 계정을 다시 복구할 수 없습니다."} yes={"삭제하기"} no={"취소하기"} />
                <ProfileModifyModal reload={setReload} date={date} nickname={nickname} isOpen={isOpen} onRequestClose={setIsOpen} />
            </Div>
            <Div className='Mid'>
                <Div className='Mid-Btns'>
                    {bottomBtn.map((value, key) => {
                        return <BottomBorderBtn key={key} label={value.label} index={value.index === index} onClick={() => setIndex(value.index)} />
                    })}
                </Div>
                <Div className='Active'>
                    {
                        index === 1 ? isEmpty[1] ? 
                            <Div className='WishList'>
                                {wishBook.map((value, key) => {
                                    return <Book key={key} title={value.title} author={value.author} id={value.id} cover_image={value.cover_image} isWish={true} />
                                })}
                            </Div> :
                            <Div className='MsgDiv'>
                                <Logo />
                                <P className='DataMsg'>찜한 책이 없어요.<br/>책 옆에 하트를 눌러 찜해볼까요?</P>
                            </Div> 
                        :index === 2 ? isEmpty[2] ?
                            <Div className='ConversationList'>
                                {conversations.map((value, key) => {
                                    const book_cover = allBooks.find((item) => item.id === value.book).cover_image;
                                    return <CharCard key={key} value={value} cover_image={book_cover}/>
                                })}
                            </Div> :
                            <Div className='MsgDiv'>
                                <Logo />
                                <P className='DataMsg'>이전 대화가 없어요.<br/>등장인물과 대화해볼까요?</P>
                            </Div> 
                        :index === 3 ? isEmpty[3] ?
                            <Div className='BookReport'>
                                {reportInfo.map((value, key) => {
                                    return <BookReportInfo key={key} id={value.id} title={allBooks[value.book+1].title} content={value.body} reviewDate={format(value.post_date, 'yy-MM-dd HH:mm')} removePost={removePost} />
                                })}
                            </Div> :
                            <Div className='MsgDiv'>
                                <Logo />
                                <P className='DataMsg'>작성한 독후감이 없어요.<br/>독후감을 작성해볼까요?</P>
                            </Div> 
                        :index === 4 ? isEmpty[4] ?
                            <Div className='QuizRecord'>
                                {
                                    quizRecords.map((value, key) => {
                                        const char = allChars.find(item => item.book === value.book.id)
                                        return <QuizRecordComponent charImg={char.character_image} quiz={value}/>
                                    })
                                }
                            </Div> :
                            <Div className='MsgDiv'>
                                <Logo />
                                <P className='DataMsg'>퀴즈 기록이 없어요.<br/>책을 읽고 퀴즈를 풀어볼까요?</P>
                            </Div> 
                        :index === 5 ? isEmpty[5] ?
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
                        </Div> :
                            <Div className='MsgDiv'>
                                <Logo />
                                <P className='DataMsg'>내가 쓴 댓글이 없어요.<br/>댓글로 독후활동을 공유해볼까요?</P>
                            </Div> 
                        : null
                    }
                </Div>
            </Div>
        </Div>
    )
}

export default Mypage;