import React, {Component} from 'react';

import Star from './Star';
import img from '../../images/test_card_medium.jpg';

const style = {
    width: '375px',
    height: '300px'
};

const imgStyle = {
    width: '350px',
    height: '210px'
};

class MovieCardMedium extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card bg-light text-black" style={style}>
                {/*<img className="card-img-top" src={imageURL + this.state.poster} alt="movie poster" />*/}
                <img className="card-img-top" style={imgStyle} src={img} alt="movie poster" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.movie.title}</h5>
                    <Star className="mr-3" rate={this.props.movie.vote_average} />
                </div>
            </div>
        );
    }
}

export default MovieCardMedium;
