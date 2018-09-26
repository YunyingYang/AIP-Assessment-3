import React, {Component} from 'react';
import axios from "axios";

import Star from './Star';

const style = {
    width: '400px',
    height: '500px'
};

class MovieCardLarge extends Component {
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

        // if you want to get a smaller preview of images: replace fanart with preview in url
        // before: http://assets.fanart.tv/fanart/movies/145220/hdmovielogo/muppets-most-wanted-53c1385817504.png
        // after: http://assets.fanart.tv/preview/movies/145220/hdmovielogo/muppets-most-wanted-53c1385817504.png
        // let imgSource = this.state.images[0].url;
        // let imgURL = imgSource.replace("assets.fanart.tv/fanart", "assets.fanart.tv/preview");

        let imgURL = this.state.images[0].url;

        return (
        <div className="card bg-light text-black" style={style}>
            <img className="card-img-top" src={imgURL} alt="movie poster" />
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
