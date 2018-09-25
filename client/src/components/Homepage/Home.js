import React from 'react';

import Carousel from './Carousel';
import MovieCardLarge from './MovieCardLarge';
import MovieCardMedium from './MovieCardMedium';
import MovieCardSmall from './MovieCardSmall';

const Home = () => {
    return (
        <div>
            <Carousel/>
            <br/>
            <br/>

            <h5>Trending Movies</h5>
            <div className="card-deck">
                <MovieCardLarge/>
                <MovieCardLarge/>
            </div>
            <br/>
            <br/>
            <div className="card-deck">
                <MovieCardMedium/>
                <MovieCardMedium/>
                <MovieCardMedium/>
            </div>
            <br/>
            <h6 className="text-right">More...</h6>
            <br/>
            <br/>

            <h5>Newest Movies</h5>
            <div className="card-deck">
                <MovieCardLarge/>
                <MovieCardLarge/>
            </div>
            <br/>
            <br/>
            <div className="card-deck">
                <MovieCardSmall/>
                <MovieCardSmall/>
                <MovieCardSmall/>
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
