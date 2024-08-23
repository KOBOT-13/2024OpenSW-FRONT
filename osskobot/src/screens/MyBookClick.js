import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { publicAxios, privateAxios } from '../services/axiosConfig';
import CharProfile from '../components/CharProfile/CharProfile';
import { Div, P, Hr, Logo } from './BookClickStyled';
import BookClickBtn from '../components/CustomButton/BookClickBtn';
import { ReactComponent as talk } from '../assets/talk.svg';
import BottomBorderBtn from '../components/CustomButton/BottomBorderBtn';
import SizeBook from '../components/Book/SizeBook';

function MyBookClick(){
    const params = useParams();
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
    const [charProfileInfos, setCharProfileInfos] = useState([]);
    const [_isWish, setIsWish] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    
    const tags = [
        "사랑",
        "모험",
        "지혜",
        "공주",
        "용기",
        "효",
        "선",
        "가족",
        "행복",
        "은혜",
        "우정",
        "청결",
        "위로",
        "성실",
        "신비",
        "창의",
        "희생",
    ];

    const featBtn = [
        { path: "chatcharchoose", label: "등장인물과 대화하기", icon: talk },
    ];

    const bottomBtn = [
        { index: 1, label: "책 소개" },
        { index: 2, label: "등장인물 소개" },
    ];

    useEffect(() => {
        publicAxios.get(`books/writtenbook/${params.id}/`)
        .then((response) => {
            setBook(response.data);
            if(response.data.synopsis === ""){
                setIsEmpty(true);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        privateAxios.get(`books/writtenbook/${params.id}/characters/`)
        .then((response) => {
            setCharProfileInfos(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        privateAxios.get(`books/wishlist/`)
        .then((response) => {
            setIsWish(response.data.includes(parseInt(params.id)));
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Div className='MainContainer'>
            <Div className='Detail'>
                <Div className='Frame'>
                    <Div className='Book'>
                        <SizeBook cover_image={book.cover_image} title={book.title} size={220} font_size={30} />
                    </Div>
                    <Div className='Right'>
                        <Div className='Info'>
                            <P className='title'>{book.title}</P>
                            <Hr />
                            <Div className='Sub-Info'>
                                <P>저자 : {book.author}</P>
                                <P>카테고리 : {book.category}</P>
                                <P>태그 : {book.tags.map(tag => `#${tags[tag+1]}`).join(' ')}</P>
                            </Div>
                        </Div>
                        <Div className='Btns'>
                            {featBtn.map((value, key) => {
                                return <BookClickBtn key={key} label={value.label} icon={value.icon} path={value.path} id={params.id} />
                            })}
                        </Div>
                    </Div>
                </Div>
            </Div>
            <Div className='Middle'>
                <Div className='Btns-Middle'>
                    {bottomBtn.map((value) => {
                        return <BottomBorderBtn key={value.index} onClick={() => setIndex(value.index)} label={value.label} index={value.index === index} />
                    })}
                </Div>
                {isEmpty?
                    <Div className='MsgDiv'>
                        <Logo/>
                        <P className='DataMsg'>준비중인 도서입니다.</P>
                    </Div> 
                    :
                    <Div className='Content-Middle'>
                    {index === 1 ?
                        <Div className='Book-Intro'>
                            {book.synopsis}
                        </Div>
                        : 
                        <Div className='Char-Intro'>
                            {charProfileInfos.map((value, key) => {
                                return <CharProfile character={value} key={key} mode={1} />
                            })}
                        </Div>
                    }
                </Div>
                }
            </Div>
        </Div>
    )
}

export default MyBookClick;