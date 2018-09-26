import React, {Component} from 'react';

import Star from './Star';
import img from '../../images/1.jpg';

const style = {
    width: '400px',
    height: '500px'
};

class MovieCardLarge extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card bg-light text-black" style={style}>
                <img className="card-img-top" src={img} alt="movie poster" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.movie.title}</h5>
                    <Star className="mr-3" rate={this.props.movie.vote_average} />
                    <p className="card-text">{this.props.movie.overview}</p>
                </div>
            </div>
        );
    }
}

export default MovieCardLarge;
