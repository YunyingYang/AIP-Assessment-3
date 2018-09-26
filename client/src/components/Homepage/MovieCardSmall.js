import React, {Component} from 'react';

const style = {
    width: '180px',
    height: '230px'
};

class MovieCardSmall extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const baseUrl = new URL(
            "http://image.tmdb.org/t/p/w185_and_h278_bestv2/"
        );

        return (
            <div className="card" style={style}>
                <img className="card-img-top" src={baseUrl + this.props.movie.poster_path} alt="movie poster" />
            </div>
        );
    }
}

export default MovieCardSmall;
