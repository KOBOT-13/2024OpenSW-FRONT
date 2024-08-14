import React, { useEffect, useState, useRef } from 'react';
import styles from './Chat.module.css'; // 이미 정의된 스타일 파일
import { IoBowlingBallOutline, IoSend } from "react-icons/io5";
import { IoMdMic } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";
import image from '../assets/profile.png';
import ChatMsg from '../components/ChatMsg/ChatMsg';
import STT from '../components/ChatMsg/STT';
import EndChat from '../components/ChatMsg/EndChat'
import STTLoading from '../components/ChatMsg/STTLoading';
import { format } from 'date-fns';
import SpeechRecognition from 'react-speech-recognition';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { publicAxios, privateAxios } from '../services/axiosConfig';
import { useConversation } from '../components/ChatMsg/ConversationContext';
import postReadBook from '../services/postReadBook';
import * as St from './ChatStyled';
import ChatHeader from '../components/Header/ChatHeader';
import { IoIosCheckboxOutline } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";

const formatDate = (date) => format(new Date(date), 'yyyy-MM-dd');

function Chat() {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const [character, setCharacter] = useState({character_image:""});
    const [STTNone, setSTTNone] = useState(false);
    const { conversationid, setConversationid } = useConversation();
    const messagesEndRef = useRef(null);
    const { transcript, listening, resetTranscript } = STT();
    const audioRef = useRef(null);
    const { id, characterid } = useParams();
    const navigate = useNavigate();

    const post_mtt_url = process.env.REACT_APP_API_POST_MTT

    const { state } = useLocation();
    const { cover_image, title } = state;

    // API로부터 캐릭터 데이터 가져오기
    useEffect(() => {
        const getCharacters = async () => {
            try {
                const response = await publicAxios.get(`books/${id}/characters/`);
                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const characters = response.data;
                const foundCharacter = characters.find(char => char.id === Number(characterid));
                setCharacter(foundCharacter);
            } catch (error) {
                console.error('Error get characters:', error);
            }
        };
        getCharacters();
    }, []);


    useEffect(() => {
        const createConversation = async () => {
            const response = await privateAxios.post(`dialogs/conversation/start_conversation/`,
                {
                    book: id,
                    character: characterid,
                }
            );
            const conid = response.data.id;
            console.log(conid);
            setConversationid(conid);
        };
        createConversation();
    }, []);

    useEffect(() => {
        const getMsg = async () => {
            const response = await publicAxios.get(`dialogs/${conversationid}/messages/`);
            const data = response.data;
            const last30Messages = data.slice(-30);
            const lastMessages = last30Messages.map(msg => ({
                message: msg.message,
                time: format(new Date(msg.timestamp), 'hh:mm aa'),
                tts: msg.tts_file,
                isOwnMessage: msg.sender_type === 'user',
                date: formatDate(msg.timestamp),
            }));
            setMessages(lastMessages);
        };
        if(conversationid !== null){
            getMsg();
        }
            
    }, [conversationid]);

    const MTT = (message) => {
        if (!character) {
            console.error('Character data is missing');
            return; // 캐릭터 데이터가 없으면 함수 종료
        }       
        privateAxios.post(`dialogs/mtt/`,
            {
                conversation_id: conversationid,
                character_id: character.id,
                summary_message_id: conversationid,
                message: message,
                speaker: character.speaker,
                volume: character.volume,
                speed: character.speed,
                pitch: character.pitch,
                emotion: character.emotion,
                emotion_strength: character.emotion_strength,
                format: character.format,
                alpha: character.alpha,
                end_pitch: character.end_pitch,
            }
        )
            .then((response) => {
                postReadBook(id);
                const bot_response = response.data.message
                const tts_url = response.data.file_url
                const newMsg = {
                    message: bot_response,
                    time: format(new Date(), 'hh:mm aa'),
                    tts: `${process.env.REACT_APP_ADDRESS}${tts_url}`,
                    isOwnMessage: false,
                    date: formatDate(new Date()),
                };
                console.log(newMsg.tts)
                setMessages((prevMessages) => [...prevMessages, newMsg]);
                playAudio(`${process.env.REACT_APP_ADDRESS}${tts_url}`)
            });
        };   
    

    const handleChatInput = (e) => {
        setMsg(e.target.value);
    }

    const onClickChatBtn = () => {

        if (msg === "") {
            return;
        }
        if (!character) {
            console.error('Character data is missing');
            return; // 캐릭터 데이터가 없으면 함수 종료
        }
        const newMsg = {
            message: msg,
            time: format(new Date(), 'hh:mm aa'),
            isOwnMessage: true,
            data: formatDate(new Date()),
        }
        console.log(msg)
        console.log(character.id)
        setMessages((prevMessages) => [...prevMessages, newMsg]);
        MTT(msg)
        setMsg("");
    }

    const onClickSTTBtn = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            if (transcript) {
                const newMsg = {
                    message: transcript,
                    time: format(new Date(), 'hh:mm aa'),
                    isOwnMessage: true,
                    data: formatDate(new Date()),
                };
                setMessages((prevMessages) => [...prevMessages, newMsg]);
                MTT(transcript)
                setSTTNone(false);
            } else {
                setSTTNone(true);
            }
            resetTranscript();
        } else {
            console.log("Debug");
            resetTranscript();
            SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
            setSTTNone(false);
        }
    };

    const renderMsg = () => {
        let lastDate = null;
        return messages.map((msg, index) => {
            const showDate = lastDate !== msg.date;
            lastDate = msg.date

            return (
                <React.Fragment key={index}>
                    {showDate && msg.isOwnMessage && <div className={styles.dateSeparator}>{msg.date}</div>}
                    <ChatMsg
                        message={msg.message}
                        time={msg.time}
                        isOwnMessage={msg.isOwnMessage}
                        playAudio={() => playAudio(msg.tts)}
                    />
                </React.Fragment>
            );
        });
    };

    const onClickEndBtn = () => {
        console.log(conversationid)
        EndChat(conversationid)
        navigate(`/bookclick/${id}`)
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const playAudio = (url) => {
        if (audioRef.current) {
            audioRef.current.src = url;
            audioRef.current.play();
        }
    };

    return (
        <St.Div>
            <St.Div className='Top'>
                <ChatHeader cover_image={cover_image} title={title} />
            </St.Div>
            <St.Div className='Mid'>
                <St.Div className='Char-Bubble'>
                    <St.Image src={character.character_image} />
                    <St.ChatDiv>
                        <St.Speech>Test</St.Speech>
                    </St.ChatDiv>
                </St.Div>
                <St.Div className='Voice-Box'>
                    <IoIosCheckboxOutline/>
                    음성으로 다시 듣기
                </St.Div>
                <St.Div className='Input-Box'>
                    <St.Input />
                    <St.Button className='Send'>전송</St.Button>
                    <St.Button className='Mic' onClick={onClickSTTBtn}>
                        {listening ?
                            <STTLoading type="bubbles" color="#00f" /> : <FaMicrophone />}
                    </St.Button>
                </St.Div>
                {STTNone && (
                    <div className={styles.warningContainer}>
                        <IoIosWarning size={24} color="red" />
                        <span className={styles.warningText}>음성 인식 결과가 없습니다. 다시 시도해 주세요.</span>
                    </div>
                )}
            </St.Div>
        </St.Div>
        // <div className={styles.mainContainer}>
        //     <div className={styles.imgChatDiv}>
        //         <img src={image} className={styles.profileImg} alt="Profile" />
        //         <div className={styles.chatDiv}>
        //             {renderMsg()}
        //             <div ref={messagesEndRef} />
        //         </div>
        //     </div>
        //     {STTNone && (
            //     <div className={styles.warningContainer}>
            //         <IoIosWarning size={24} color="red" />
            //         <span className={styles.warningText}>음성 인식 결과가 없습니다. 다시 시도해 주세요.</span>
            //     </div>
            // )}
        //     <div className={styles.inputDiv}>
        //         {listening && (
        //             <div className={styles.sttLoading}>
                        // <STTLoading type="bubbles" color="#00f" />
        //             </div>
        //         )}
        //         <input
        //             className={styles.chatInput}
        //             onChange={handleChatInput}
        //             value={msg}
        //             type="text"
        //             placeholder=""/>
        //         <button className={styles.chatBtn} onClick={onClickChatBtn}><IoSend size={20} /></button>
        //         <button className={styles.STTBtn} onClick={onClickSTTBtn}><IoMdMic size={20} color={listening ? "red" : "black"} /></button>
        //     </div>
        //     <button className={styles.endBtn} onClick={onClickEndBtn}></button>
        //     <audio ref={audioRef} />
        // </div>
    );
}

export default Chat;
