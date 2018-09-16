import React from 'react';
import MovieListCell from './movieListCell';
import './movieList.css';

// const listStyle = {
//     width: '900px',
//     height: '500px',
//     /*opacity: 0%;*/
//     background: 'rgba(0, 0, 0, 0)',
//     margin: 'auto',
//
// };

const list = () => {
    return (
        <div className='MovieList'>
            <p>Trending now...</p>
            <MovieListCell/>
            {/*<MovieListCell/>*/}
            {/*<MovieListCell/>*/}
        </div>
    )
};

export default list;