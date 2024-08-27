import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import reportForm1 from '../forms/reportForm1';
import reportForm2 from '../forms/reportForm2';
import reportForm3 from '../forms/reportForm3';
import { privateAxios } from '../services/axiosConfig';
import postReadBook from '../services/postReadBook';
import ChatHeader from '../components/Header/ChatHeader';
import SelectBox from '../components/SelectBox/SelectBox';
import { Div, TextArea, Button } from './BookReportStyled';
import Swal from 'sweetalert2';

function BookReport() {
    const naviate = useNavigate();
    const bookId = useParams('id').id;
    const selectList = [
        { value: 0, name: "양식 선택" },
        { value: 1, name: "독후감" },
        { value: 2, name: "등장인물에게 편지쓰기" },
        { value: 3, name: "뒷 내용 생각해보기" }
    ];

    const [formContent, setFormContent] = useState("");

    const { state } = useLocation();
    const { cover_image, title } = state;

    const handleSelect = (e) => {
        const selectForm = e;

        if (selectForm === '1') {
            setFormContent(reportForm1);
        }
        else if (selectForm === '2') {
            setFormContent(reportForm2);
        }
        else if (selectForm === '3') {
            setFormContent(reportForm3);
        }
        else {
            setFormContent("");
        }
    };

    const handleContent = (e) => {
        setFormContent(e.target.value);
    }

    const onClickApply = () => {
        postReadBook(bookId);
        privateAxios.post(`books/posts/`,
            {
                "book": bookId,
                "body": formContent
            }
        ).then(() => {
            Swal.fire({
                icon: "success",
                text: "독후감 작성이 완료되었습니다.",
                confirmButtonColor: "#007AFF",
                confirmButtonText: "확인"
            });
            naviate(`/bookclick/${bookId}`);
        }).catch((error) => {
            console.log(error);
        });
    }

    const onClickCancle = () => {
        naviate(-1);
    }

    return (
        <Div className='MainContainer'>
            <ChatHeader cover_image={cover_image} title={title} />
            <Div className='Top'>
                <SelectBox selectList={selectList} fontSize={18} onChange={handleSelect} />
            </Div>
            <Div className='Mid'>
                <TextArea value={formContent} onChange={handleContent} placeholder='독후감 작성...'/>
                <Div className='Btns-Mid'>
                    <Button className='cancle' onClick={onClickCancle}>취소하기</Button>
                    <Button onClick={onClickApply}>작성하기</Button>
                </Div>
            </Div>
        </Div>
    )
}

export default BookReport;