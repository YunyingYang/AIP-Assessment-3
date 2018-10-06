import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import defaultImage from "../../images/noimagefound-dog.png";

const style = {
    width: '375px',
    height: '300px'
};

class MovieCardMedium extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            rating: "",
            images: {}
        };
    }

    componentDidMount() {
        const authheader = axios.defaults.headers.common["Authorization"] || null;
        delete axios.defaults.headers.common["Authorization"];

        // get movie details from tmdb api
        const tmdbUrl = "https://api.themoviedb.org/3/movie/"
            + this.props.movie.tmdbId
            + "?api_key=9ff347d908a575c777ebecebe3fdcf6b&language=en-US";

        axios
            .get(tmdbUrl)
            .then(res => {
                this.setState({ title: res.data.title });
                this.setState({ rating: parseFloat(res.data.vote_average) });
            })
            .catch(err => console.log("Medium card: tmdb err"));

        // get movie stills from fanart.tv api
        const fanartUrl = "https://webservice.fanart.tv/v3/movies/"
            + this.props.movie.tmdbId
            + "?api_key=33f74d6cff548383dab95ca4f8901333";

        axios
            .get(fanartUrl)
            .then(res => {
                this.setState({ images: res.data.moviebackground[0] });
                // console.log(this.state.images);
            })
            .catch(err => console.log("Medium card: fanart err"));

        // add authentication back
        axios.defaults.headers.common["Authorization"] = authheader;
    }

    render() {
        if (!this.state.images)
            return <div>Loading...</div>;

        let imgURL = this.state.images.url;

        return (
            <div className="card bg-light text-black" style={style} >
                {/* redirect to movie details page */}
                <Link to={`/api/movies/mvdetails/${this.props.movie._id}`} >
                    {imgURL ? (
                        <img
                            className="card-img-top"
                            src={imgURL}
                            alt="movie poster"
                        />
                    ) : (
                        <img
                            className="card-img-top"
                            src={defaultImage}
                            alt="movie poster"
                        />
                    )}
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{this.state.title}</h5>
                    <p className="card-text">{this.props.movie.genres}</p>
                </div>
            </div>
        );
    }
}

export default MovieCardMedium;
