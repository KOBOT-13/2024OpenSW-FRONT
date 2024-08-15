import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { publicAxios, privateAxios } from '../services/axiosConfig';
import CommentBoard from '../components/CommentBoard/CommentBoard';
import CharProfile from '../components/CharProfile/CharProfile';
import cookies from 'js-cookie';
import { format } from 'date-fns'
import postReadBook from '../services/postReadBook';
import { Div, Image, P, Hr, TextArea, Button, CommentsPage, Heart } from './BookClickStyled';
import BookClickBtn from '../components/CustomButton/BookClickBtn';
import { ReactComponent as talk } from '../assets/talk.svg';
import { ReactComponent as quiz } from '../assets/quiz.svg';
import { ReactComponent as report } from '../assets/report.svg';
import BottomBorderBtn from '../components/CustomButton/BottomBorderBtn';


function BookClick() {
    const params = useParams();
    const { state } = useLocation();
    const { isWish } = state;
    const [book, setBook] = useState(
        {
            title: "",
            author: "",
            cover_image: "",
            synopsis: "",
            category: "",
            tags: [],
        }
    );
    const [index, setIndex] = useState(1)
    const [commentMsg, setCommentMsg] = useState('');
    const [commentInfos, setCommentInfos] = useState([]);
    const [charProfileInfos, setCharProfileInfos] = useState([]);
    const [_isWish, setIsWish] = useState(isWish);

    const click = () => {
        privateAxios.post(`books/wishlist/toggle/${params.id}/`, )
        .then(() => {
            setIsWish((current) => !current);
        }).catch((error) => {
            console.log(error);
        });
    };
    
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentComments = commentInfos.slice(indexOfFirstItem, indexOfLastItem);

    const featBtn = [
        { path: "chatcharchoose", label: "등장인물과 대화하기", icon: talk },
        { path: "quiz", label: "독서퀴즈 맞추기", icon: quiz },
        { path: "bookreport", label: "독후감 작성하기", icon: report },
    ];

    const bottomBtn = [
        { index: 1, label: "책 소개" },
        { index: 2, label: "등장인물 소개" },
        { index: 3, label: "독후활동 공유" }
    ];

    useEffect(() => {
        const getBookDetail = async () => {
            await publicAxios.get(`books/book/${params.id}/`)
                .then((response) => {
                    setBook(response.data);
                    console.log(response.data.tags.map((value) => console.log(value)));
                }).catch((error) => {
                    console.log(error);
                });
        }
        getBookDetail();
    }, []);

    useEffect(() => {
        privateAxios.get(`books/books/${params.id}/comments/`)
        .then((response) => {
            setCommentInfos(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    useEffect(() => {
        privateAxios.get(`books/${params.id}/characters/`)
        .then((response) => {
            setCharProfileInfos(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const onChangeComment = (e) => {
        if(e.target.value.length <= 150){
            setCommentMsg(e.target.value);
        }
    }
    const onSubmitClk = (e) => {
        e.preventDefault();
        if (commentMsg !== '') {
            setCommentMsg('');
            privateAxios.post(`books/comments/`,
                {
                    'book': params.id,
                    'content': commentMsg
                },
            ).then((response) => {
                postReadBook(params.id);
                const newComment = response.data;
                setCommentInfos((prevComments) => [newComment, ...prevComments]);
            })
        }
    };

    const removeComment = (id) => {
        const updatedComments = commentInfos.filter(commnet => commnet.id !== id);
        setCommentInfos(updatedComments);
    };

    return (
        <Div className='MainContainer'>
            <Div className='Detail'>
                <Div className='Frame'>
                    <Image src={book.cover_image} />
                    <Div className='Right'>
                        <Div className='Info'>
                            <P className='title'>{book.title}</P>
                            <Hr />
                            <Div className='Sub-Info'>
                                <P>저자 : {book.author}</P>
                                <P>카테고리 : {book.category}</P>
                                <P>태그 : {book.tags.map(tag => `#${tag.name}`).join(' ')}</P>
                            </Div>
                        </Div>
                        <Div className='Btns'>
                            {featBtn.map((value, key) => {
                                return <BookClickBtn key={key} label={value.label} icon={value.icon} path={value.path} id={params.id} />
                            })}
                        </Div>
                        <Heart $isWish={_isWish} onClick={(e) => {e.stopPropagation();click()}} />
                    </Div>
                </Div>
            </Div>
            <Div className='Middle'>
                <Div className='Btns-Middle'>
                    {bottomBtn.map((value) => {
                        return <BottomBorderBtn key={value.index} onClick={() => setIndex(value.index)} label={value.label} index={value.index === index} />
                    })}
                </Div>
                <Div className='Content-Middle'>
                    {index === 1 ?
                        <Div className='Book-Intro'>
                            {book.synopsis}
                        </Div>
                        : index === 2 ?
                            <Div className='Char-Intro'>
                                {charProfileInfos.map((value, key) => {
                                    return <CharProfile character={value} key={key} mode={1} />
                                })}
                            </Div>
                            : <Div className='Comment-Middle'>
                                <Div className='Comment-Board'>
                                    <TextArea value={commentMsg} onChange={onChangeComment} placeholder='댓글을 입력해주세요.'></TextArea>
                                    <Div className='Comment-Btn'>
                                        <P className='comment-size'>{commentMsg.length} / 150</P>
                                        <Button onClick={onSubmitClk}>댓글달기</Button>
                                    </Div>
                                </Div>
                                <Div className='Bottom'>
                                    <Div className='Comment-Written'>
                                        <P className='cwtitle'>작성된 댓글</P>
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
                                            totalItemsCount={commentInfos.length}
                                            pageRangeDisplayed={10}
                                            prevPageText={"<"}
                                            nextPageText={">"}
                                            onChange={handlePageChange}
                                        />
                                    </Div>
                                </Div>
                            </Div>}
                </Div>
            </Div>
        </Div>
    )
}

export default BookClick;