import React from 'react';
import ReactLoading from 'react-loading';

const STTLoading = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={32} width={32}/>
);

export default STTLoading;