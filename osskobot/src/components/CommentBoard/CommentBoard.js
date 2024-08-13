
import { useState } from 'react';
import CustomModal from '../Modal/CheckModal';
import { privateAxios } from '../../services/axiosConfig';
import { Div, Ul, Li, HeartIcon, Button, TextArea, P } from './CommentBoardStyled.js';

function CommentBoard({ id, nickname, comment, likes, date, onLikes, isMine, delCommnet}) {
    const [isLikes, setIsLikes] = useState(onLikes);
    const [isEdit, setIsEdit] = useState(false);
    const [newComment, setNewComment] = useState(comment);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [_likes, setLikes] = useState(likes);

    const click = () => {
        setIsLikes((current) => !current);
        privateAxios.post(`${process.env.REACT_APP_API_ADDRESS}books/comments/${id}/like/`, )
        .then(() => {
            privateAxios.get(`${process.env.REACT_APP_API_ADDRESS}books/comments/${id}/liked_users/`)
            .then((response) => {
                setLikes(response.data.liked_users.length);
            }).catch((error) => console.log(error));
        }).catch((error) => {
            console.log(error);
        });
    };
    const onClickDelete = () => {
        delCommnet(id);
        privateAxios.delete(`${process.env.REACT_APP_API_ADDRESS}books/comments/${id}/`)
        .catch((error) => {
            console.log(error);
        })
    };
    const onClickEdit = () => {
        setIsEdit(true);
    };
    const onChangeNewComment = (e) => {
        if(e.target.value.length <= 150){
            setNewComment(e.target.value);
        }
    }
    const onClickChangeComment = () => {
        privateAxios.patch(`${process.env.REACT_APP_API_ADDRESS}books/comments/${id}/`, 
            {
                content: newComment
            },
        ).then((response) => {
            console.log(response);
            
        }).catch((error) => {
            console.log(error);
        })
        setIsEdit(false);
    }
    const onClickCancle = () => {
        setNewComment(comment);
        setIsEdit(false);
    }

    return (
        <Div className='Frame'>
            <Div className='Top'>
                <Ul>
                    <Li key={1}>{nickname}</Li>
                    <Li key={2}>{date}</Li>
                    <Li key={3} className='Heart' ><HeartIcon onClick={() => click()} isLikes={isLikes}/>{_likes}</Li>
                </Ul>
                {isMine ? isEdit ? null 
                :<Div className='Option'>
                    <Button onClick={onClickEdit} className='Edit'>수정</Button>
                    <Button onClick={() => setModalIsOpen(true)} className='Delete'>삭제</Button>
                    <CustomModal isOpen={modalIsOpen} onRequestClose={setModalIsOpen} del={onClickDelete} msg={"정말로 삭제하시겠습니까?"} />
                </Div>:null}
            </Div>
            {isEdit
                ? <Div className='New-Commnet-Board'>
                    <TextArea onChange={onChangeNewComment} value={newComment} />
                    <Div className='NewComment-Btn'>
                        <P className='new-comment-size'>{newComment.length} / 150</P>
                        <Div>
                            <Button className='Edit' onClick={onClickChangeComment}>수정</Button>
                            <Button onClick={onClickCancle}>취소</Button>
                        </Div>
                    </Div>
                </Div>
                : <Div className='Content'>
                    {newComment}
                </Div>}
        </Div>
    )
}

export default CommentBoard;
