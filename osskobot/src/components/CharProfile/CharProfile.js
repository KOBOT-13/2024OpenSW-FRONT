import styles from './CharProfile.module.css';
import styled from 'styled-components';
import React from 'react';

const Image = styled.img`
    width: ${props => props.$size}px;
    border-radius: 500px;
`;

function CharProfile({character, size=100, onClick}){
    return (
        <div className={styles.profileDiv} onClick={onClick}>
            <Image src={character.character_image} alt={character.name} $size={size} />
            <p className={styles.name}>{character.name}</p>
        </div>
    )
};

export default CharProfile;