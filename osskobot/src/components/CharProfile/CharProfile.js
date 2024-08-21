import styles from './CharProfile.module.css';
import Modal from '../Modal/CharIntroModal';
import styled from 'styled-components';
import React, { useState } from 'react';

const Image = styled.img`
    width: ${props => props.$size}px;
    border-radius: 500px;
    cursor: pointer;
`;

function CharProfile({character, mode, size=100, onClick}){
    const [isClk, setIsClk] = useState(false);

    const onClickBtn = () => {
        setIsClk(true);
    };

    const onRequestClose = () => {
        setIsClk(false);
    };

    return (
        <div className={styles.profileDiv}>
            <button className={styles.profileBtn} onClick={mode===1 ? onClickBtn : onClick} >
                <Image src={character.character_image} alt={character.name} $size={size} />
            </button>
            <p className={styles.name}>{character.name}</p>
            <Modal isOpen={isClk} onRequestClose={onRequestClose} name={character.name} description={character.description} src={character.character_image} mode={mode} content={`${character.description}`} characterid={character.id}/>
        </div>
    )
};

export default CharProfile;