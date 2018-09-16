import React from 'react';
import icon from '../../images/movie-icon.png';

const cellStyle = {
    width: '200px',
    height: '60px',
    padding: '5px',
    background: 'white',
};

const imgStyle = {
    height: '40px',
    width: '40px',
    position: 'relative',
    top: '5px',
    left: '-70px',
};

const textStyle = {
    position: 'relative',
    left: '20px',
    top: '-28px',
};

const cell = () => {
    return (
        <div className='Cell' style={cellStyle}>
            <img src={icon} style={imgStyle} />
            <h3 style={textStyle}>Isle Of Dogs</h3>
        </div>
    )
};

export default cell;