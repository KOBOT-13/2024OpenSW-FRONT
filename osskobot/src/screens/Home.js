import styles from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BookRequestModal from '../components/Modal/BookRequestModal';
import { useEffect, useState, useLayoutEffect } from 'react';
import { publicAxios, privateAxios } from '../services/axiosConfig';
import cookies from 'js-cookie';
import SubHeader from '../components/Header/SubHeader';
import SelectBox from '../components/SelectBox/SelectBox';
import CategoryBtn from '../components/CustomButton/CategoryBtn';
import Book from '../components/Book/Book';
import {ReactComponent as ErrorLogo} from '../assets/ErrorLogo.svg';
import Pagination from 'react-js-pagination';

const Div = styled.div`
    width: 70%;
    &.Wrap-Heading{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 45px;
        height: 60px;
    }
    &.Books{
        margin-top: 30px;
        display:flex;
        flex-flow: row wrap;   
    }
    &.MsgDiv{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 110px;
    }
`;

const P = styled.p`
    font-family: 'Pretendard-SemiBold';
    font-size: 22px;
    margin: 0;
    &.DataMsg{
        font-family: 'Pretendard-Bold';
        font-size: 30px;
        color: rgba(0,0,0,0.35);
        text-align: center;
        line-height: 50px;
    }
`;

const Logo = styled(ErrorLogo)``;
const StyledPaginationWrapper = styled.div`
    ul {
        display: flex;
        justify-content: center;
        padding: 10px 0;
        list-style: none;
    }
  
    li {
        margin: 0 5px;
    }

    li a {
        display: block;
        padding: 8px 16px;
        border: 1px solid #ddd;
        border-radius: 4px;
        color: #007bff;
        text-decoration: none;
        cursor: pointer;

        &:hover {
        background-color: rgba(0, 123, 255, 0.5);
        }
    }

    .active a {
        background-color: #007bff;
        color: white;
        border: 1px solid #007bff;
    }

    .disabled a {
        color: #ccc;
        cursor: not-allowed;
    }
`;

const CommentsPage = (props) => {
    return (
        <StyledPaginationWrapper>
            <Pagination {...props} />
        </StyledPaginationWrapper>
    );
}

function Home({searchQuery, setSearchQuery}) {
    const navigate = useNavigate();
    const [isBookRequestModalOpen, setIsBookRequestModalOpen] = useState(false);
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [myBooks, setMyBooks] = useState([]);
    const [recommendBooks, setRecommendBooks] = useState([]);
    const [searchBooks, setSearchBooks] = useState([]);
    const [genreBooks, setGenreBooks] = useState([]);
    const [totlaBooks, setTotalBooks] = useState([]);
    const [index, setIndex] = useState(0);
    const [subHeaderIndex, setSubHeaderIndex] = useState(0);
    const [wishes, setWishes] = useState([]);
    const [isActiveData, setIsActiveData] = useState(false);
    const [isLackData, setIsLackData] = useState(false);
    const [state, setState] = useState(null);
    const token = cookies.get('token');

    const [page, setPage] = useState(1);
    const itemsPerPage = 12;

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = totlaBooks.slice(indexOfFirstItem, indexOfLastItem);

    const selectList = [
        {value: 1, name:"신규등록순"},
        {value: 2, name:"제목순"},
        {value: 3, name:"인기순"}
    ];

    const category = [
        {index: 0, content: "전체"},
        {index: 1, content: "판타지"},
        {index: 2, content: "소설"},
        {index: 3, content: "그림책"},
        {index: 4, content: "위인전"},
        {index: 5, content: "전래동화"},
        {index: 6, content: "우화"},
    ];
    
    useEffect(() => {
        const filter = books.filter(item => 
            searchBooks.some(item2 => item.id === item2.id) &&
            genreBooks.some(item3 => item.id === item3.id)
        );
        setTotalBooks(filter);
    }, [books, searchBooks, genreBooks])

    useEffect(() => {
        privateAxios.get(`books/wishlist/`)
        .then((response) => {
            setWishes(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        if(searchQuery.length === 0){
            console.log(books);
            setSearchBooks(books);
            return;
        }
        setSearchBooks(books.filter((item) => item.title.toLowerCase().includes(searchQuery)));
    }, [searchQuery]);

    useEffect(() => {
        if(index == 0){
            setGenreBooks(books);
            return;
        }
        setGenreBooks(books.filter(item => item.category === category[index].content))
    }, [index]);

    useEffect(() => {
        if(state){
            setIndex(0);
            setSearchQuery('');
            if(subHeaderIndex === 0){
                setBooks(allBooks);
                setGenreBooks(allBooks);
                setSearchBooks(allBooks);
                setTotalBooks(allBooks);
            } else if(subHeaderIndex === 1){
                if(token){
                    setBooks(myBooks);
                    setGenreBooks(myBooks);
                    setSearchBooks(myBooks);
                    setTotalBooks(myBooks);
                }
                else{
                    setBooks([]);
                    setGenreBooks([]);
                    setSearchBooks([]);
                    setTotalBooks([]);
                    alert("로그인을 해주세요.");
                    navigate('/login');
                }
            } else{
                if(token){
                    console.log(recommendBooks);
                    setBooks(recommendBooks);
                    setGenreBooks(recommendBooks);
                    setSearchBooks(recommendBooks);
                    setTotalBooks(recommendBooks);
                }
                else{
                    setBooks([]);
                    setGenreBooks([]);
                    setSearchBooks([]);
                    setTotalBooks([]);
                    alert("로그인을 해주세요.");
                    navigate('/login');
                }
            }
        }
    }, [state, subHeaderIndex]);

    useEffect(() => {
        publicAxios.get(`books/AllBooks/`)
        .then((response) => {
            setAllBooks(response.data);
            setBooks(response.data)
            setState(true);
        }).catch((error) => {
            console.log(error);
        });

        if(token){
            privateAxios.get(`books/user-read-book-list/get/`)
            .then((response) => {
                const data = response.data.map((value) => value.book);
                if(data.length === 0){
                    setIsActiveData(true);
                }
                setMyBooks(data);
            }).catch((error) => {
                console.log(error);
            });

            privateAxios.get(`books/recommend/list/`)
            .then((response) => {
                const data = response.data.map((value) => value.book);
                setRecommendBooks(data);
            }).catch((error) => {
                console.log(error);
                setIsLackData(true);
            });
        }
    }, []);

    useEffect(() => {
        if(!token){
            setSearchQuery('');
            setIndex(0);
            setSubHeaderIndex(0);
        }
    }, [token])

    return (
        <div className={styles.mainDiv}>
            <SubHeader index={subHeaderIndex} setSubHeaderIndex={setSubHeaderIndex}/>
            <Div className='Wrap-Heading'>
                <P>둘러보기</P>
                <SelectBox selectList={selectList}/>
            </Div>
            <Div className='Category'>
                {category.map((value, key) => {
                    return <CategoryBtn key={key} onClick={() => setIndex(value.index)} content={value.content} index={value.index === index}/>
                })}
            </Div>
            <Div className='Books'>
                {subHeaderIndex === 0 ?
                    currentBooks.map((value, key) => {
                        return <Book key={key} title={value.title} author={value.author} id={value.id} cover_image={value.cover_image} isWish={wishes.includes(value.id)} />
                    })
                    :
                subHeaderIndex === 1 ?
                    isActiveData ? 
                    <Div className='MsgDiv'>
                        <Logo/>
                        <P className='DataMsg'>내 책장이 비어있어요.<br/>독후활동을 하고 책을 꽂아보아요!</P>
                    </Div> :
                    currentBooks.map((value, key) => {
                        return <Book key={key} title={value.title} author={value.author} id={value.id} cover_image={value.cover_image} isWish={wishes.includes(value.id)} />
                    })
                    :
                    isLackData ? 
                    <Div className='MsgDiv'>
                        <Logo/>
                        <P className='DataMsg'>독후활동을 해볼까요?<br/>자신에게 맞는 책을 추천받을 수 있어요!</P>
                    </Div> :
                    currentBooks.map((value, key) => {
                        return <Book key={key} title={value.title} author={value.author} id={value.id} cover_image={value.cover_image} isWish={wishes.includes(value.id)} />
                    })
                }
            </Div>
            <CommentsPage
                    activePage={page}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={books.length}
                    pageRangeDisplayed={12}
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={handlePageChange}
                />
        </div>
    )
}

export default Home;