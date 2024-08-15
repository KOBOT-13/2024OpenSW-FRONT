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

function Home({searchQuery}) {
    const navigate = useNavigate();
    const [isBookRequestModalOpen, setIsBookRequestModalOpen] = useState(false);
    const [filteringBooks, setFilteringBooks] = useState([]);
    const [index, setIndex] = useState(0);
    const [wishes, setWishes] = useState([]);

    const selectList = [
        {value: 1, name:"신규등록순"},
        {value: 2, name:"제목순"},
        {value: 3, name:"인기순"}
    ];

    const category = [
        {index: 0, content: "전체"},
        {index: 1, content: "사랑"},
        {index: 2, content: "모험"},
        {index: 3, content: "지혜"},
        {index: 4, content: "공주"},
        {index: 5, content: "용기"},
        {index: 6, content: "효"},
        {index: 7, content: "선"},
        {index: 8, content: "가족"},
        {index: 9, content: "행복"},
        {index: 10, content: "은혜"},
        {index: 11, content: "우정"},
        {index: 12, content: "청결"},
        {index: 13, content: "위로"},
        {index: 14, content: "성실"},
        {index: 15, content: "신비"},
        {index: 16, content: "창의"},
        {index: 17, content: "희생"},
    ];

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
        privateAxios.get(`books/wishlist/`)
        .then((response) => {
            setWishes(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        publicAxios.get(`books/search/?q=${searchQuery}`)
        .then((response) => {
            setFilteringBooks(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [searchQuery]);

    useEffect(() => {
        if(index == 0){
            publicAxios.get(`books/AllBooks/`)
            .then((response) => {
                setFilteringBooks(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
        }
        publicAxios.get(`books/tag/${index}/`)
        .then((response) => {
            setFilteringBooks(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [index]);

    return (
        <div className={styles.mainDiv}>
            <SubHeader/>
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
                {filteringBooks.map((value, key) => {
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