import React from 'react';
import './movieDetails.css';
import twitter from '../../images/twitter.png';
import facebook from '../../images/facebook.jpg';


const details = () => {
    return (
        <div className="MovieDetails">
            <div className="Video">
                <iframe id="ytplayer" type="text/html" width="420" height="300"
                        src="https://www.youtube.com/embed/CGzKnyhYDQI?autoplay=1&origin=https://www.youtube.com/watch?v=Q-z0csLnwxU"
                        frameBorder="0">
                </iframe>
            </div>

            <div className="Description">
                <h3>Loving Vincent (2017)</h3>
                <br/>
                <p id='desc'>In a story depicted in oil painted animation, a young man comes to the last hometown of painter Vincent van Gogh to deliver the troubled artist's final letter and ends up investigating his final days there.</p>
                <br/>
                <img src={facebook} />
                <img src={twitter} />
            </div>
        </div>
    )
};

export default details;