import React, {Component} from 'react';
import axios from "axios";
import small_img from '../../images/test_card_small.jpg';

const style = {
    width: '180px',
    height: '230px'
};


class MovieCardSmall extends Component {
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
            <div className="card" style={style}>
                {/*<img className="card-img-top" src={imageURL + this.state.poster} alt="movie poster" />*/}
                <img className="card-img-top" src={small_img} alt="movie poster" />
            </div>
        );
    }
}

export default MovieCardSmall;
