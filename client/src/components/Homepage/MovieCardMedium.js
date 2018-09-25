import React, {Component} from 'react';
import axios from "axios";
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

        this.state = {
            poster: "",
        };
    }

    componentDidMount() {
        const url = new URL(
            "https://api.themoviedb.org/3/movie/" +
            this.props.tmdbId +
            "?api_key=9ff347d908a575c777ebecebe3fdcf6b&language=en-US"
        );

        axios
            .get(url)
            .then(res => {
                console.log(res.data);
                this.setState({ poster: res.data.poster_path });
            })
    }

    render() {

        const imageURL = new URL(
            "http://image.tmdb.org/t/p/w185_and_h278_bestv2/"
        );


        return (
            <div className="card bg-light text-black" style={style}>
                {/*<img className="card-img-top" src={imageURL + this.state.poster} alt="movie poster" />*/}
                <img className="card-img-top" style={imgStyle} src={img} alt="movie poster" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <Star className="text-right" />
                    <p className="card-text">{this.props.genres}</p>
                </div>
            </div>
        );
    }
}

export default MovieCardMedium;
