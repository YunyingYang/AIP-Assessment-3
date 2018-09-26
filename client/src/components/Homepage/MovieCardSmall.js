import React, {Component} from 'react';
import axios from "axios";
import small_img from '../../images/test_card_small.jpg';

const style = {
    width: '180px',
    height: '230px'
};


class MovieCardSmall extends Component {

    render() {

        const imageURL = new URL(
            "http://image.tmdb.org/t/p/w185_and_h278_bestv2/"
        );

        return (
            <div className="card" style={style}>
                {/*<img className="card-img-top" src={imageURL + this.props.poster_path} alt="movie poster" />*/}
                <img className="card-img-top" src={small_img} alt="movie poster" />
            </div>
        );
    }
}

export default MovieCardSmall;
