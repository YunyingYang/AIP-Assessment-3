import React from 'react';

import Carousel from './Carousel';
import MovieCard from './MovieCard';
import MovieCardSmall from './MovieCardSmall';

const Home = () => {
    return (
        <div>
            <Carousel/>
            <br/>
            <br/>

            <h5>Trending Movies</h5>
            <div className="card-deck">
                <MovieCard/>
                <MovieCard/>
            </div>
            <br/>
            <br/>
            <div className="card-deck">
                <MovieCardSmall/>
                <MovieCardSmall/>
                <MovieCardSmall/>
            </div>
            <br/>
            <h6 className="text-right">More...</h6>
            <br/>
            <br/>

            <h5>Newest Movies</h5>
            <div className="card-deck">
                <MovieCard/>
                <MovieCard/>
            </div>
            <br/>
            <br/>
            <div className="card-deck">
                <MovieCardSmall/>
                <MovieCardSmall/>
                <MovieCardSmall/>
            </div>
            <br/>
            <h6 className="text-right">More...</h6>

            <br/>
            <br/>
        </div>
    );
};

export default Home;
