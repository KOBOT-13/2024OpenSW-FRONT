import styles from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BookRequestModal from '../components/Modal/BookRequestModal';
import { useEffect, useState } from 'react';
import { publicAxios, privateAxios } from '../services/axiosConfig';
import cookies from 'js-cookie';
import SubHeader from '../components/Header/SubHeader';
import SelectBox from '../components/SelectBox/SelectBox';
import CategoryBtn from '../components/CustomButton/CategoryBtn';
import Book from '../components/Book/Book';

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
`;

const P = styled.p`
    font-family: 'Pretendard-SemiBold';
    font-size: 22px;
    margin: 0;
`;

function Home({searchQuery, setSearchQuery}) {
    const navigate = useNavigate();
    const [isBookRequestModalOpen, setIsBookRequestModalOpen] = useState(false);
    const [books, setBooks] = useState([]);
    const [searchBooks, setSearchBooks] = useState([]);
    const [genreBooks, setGenreBooks] = useState([]);
    const [totlaBooks, setTotalBooks] = useState([]);
    const [index, setIndex] = useState(0);
    const [subHeaderIndex, setSubHeaderIndex] = useState(0);
    const [wishes, setWishes] = useState([]);

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

    // const category = [
    //     {index: 0, content: "전체"},
    //     {index: 1, content: "fantasy"},
    //     {index: 2, content: "novel"},
    //     {index: 3, content: "picture book"},
    //     {index: 4, content: "biography"},
    //     {index: 5, content: "traditional fairy tale"},
    //     {index: 6, content: "falbe"},
    // ];

    const onClickApplyBtn = async () => {
        const token = cookies.get('token');
        if(token){
            await privateAxios.post(`users/auth/token/verify/`,
                {
                    token: token
                }
            ).then((response) => {
                setIsBookRequestModalOpen(true);
            }).catch((error) => {
                setIsBookRequestModalOpen(true);
            })
        } else{
            alert("로그인을 해주세요.");
            navigate('/login');
        }
    } 

    useEffect(() => {
        setIndex(0);
        setSearchQuery('');
        if(subHeaderIndex === 0){
            publicAxios.get(`books/AllBooks/`)
            .then((response) => {
                setBooks(response.data);
                setGenreBooks(response.data);
                setSearchBooks(response.data);
                setTotalBooks(response.data);
            }).catch((error) => {
                console.log(error);
            });
        } else if(subHeaderIndex === 1){
            // 내 책장 api 실행
        } else{
            // 추천 도서 api 실행
        }

    }, [subHeaderIndex]);
    
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
        // if(index !== 0){
        //     publicAxios.get(`books/tag/${index}/`)
        //     .then((response) => {
        //         setFilteringBooks(books.filter(item1 => response.data.some(item2 => item1.id === item2.id)));
        //     }).catch((error) => {
        //         console.log(error);
        //     });
        // }
    }, [index]);

    useEffect(() => {
        const filter = books.filter(item => 
            searchBooks.some(item2 => item.id === item2.id) &&
            genreBooks.some(item3 => item.id === item3.id)
        );
        setTotalBooks(filter);
    }, [books, searchBooks, genreBooks])

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
                {totlaBooks.map((value, key) => {
                    return <Book key={key} title={value.title} author={value.author} id={value.id} cover_image={value.cover_image} isWish={wishes.includes(value.id)} />
                })}
            </Div>
            {/* <div className={styles.bookshelp}>
                <div>
                    <ul className={styles.bookFilter}>
                        {filters.map(filter => (
                            <li className={styles.filter} key={filter.id}>
                                <button className={styles.filterBtn}>
                                    {filter.text}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.bookSlide}>
                    {
                        books.map((key, value) => {
                            return <Link to={`/bookclick/${key.id}`}>
                                <img className={styles.bookImg} alt='책' src={`${process.env.REACT_APP_ADDRESS}${key.cover_image}/`} />
                            </Link>
                        })
                    }
                </div>
            </div>
            <BookRequestModal isOpen={isBookRequestModalOpen} onRequestClose={setIsBookRequestModalOpen} /> */}
        </div>
    )
}

export default Home;