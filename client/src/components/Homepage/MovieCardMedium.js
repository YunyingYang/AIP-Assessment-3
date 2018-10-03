import React, {Component} from 'react';
import axios from "axios";

import Star from './Star';
import {Link} from "react-router-dom";

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
            images: {}
        };
    }

    componentDidMount() {
        // get movie stills from fanart.tv api
        const baseUrl = "https://webservice.fanart.tv/v3/movies/";
        const id = this.props.movie.id;
        const key = "?api_key=33f74d6cff548383dab95ca4f8901333";
        const url = baseUrl + id + key;

        axios
            .get(url)
            .then(res => {
                console.log(res.data);
                this.setState({ images: res.data.moviebackground });
            })
            .catch(err => console.log("cannot get movie stills"));
    }

    render() {
        if (!this.state.images[0])
            return <div>Loading...</div>;

        let imgURL = this.state.images[0].url;

        return (
            <div className="card bg-light text-black" style={style}>
                <Link to={`/api/movies/mvdetails/${this.props.movie.id}`}>
                    <img className="card-img-top" style={imgStyle} src={imgURL} alt="movie poster" />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.movie.title}</h5>
                        <Star className="mr-3" rate={this.props.movie.vote_average} />
                    </div>
                </Link>
            </div>
        );
    }
}

export default MovieCardMedium;
