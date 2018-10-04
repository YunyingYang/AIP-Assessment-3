import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const style = {
    width: '180px',
    height: '230px'
};

class MovieCardSmall extends Component {
    constructor(props) {
        super(props);

        this.state = {
            poster: {}
        };
    }

    componentDidMount() {
        // bug report: authentication conflicts with tmdb api and fanart.tv api
        // quick & dirty solution: delete authentication for now and add it back later >_<
        delete axios.defaults.headers.common["Authorization"];

        // get movie details from tmdb api
        const tmdbUrl = "https://api.themoviedb.org/3/movie/"
            + this.props.movie.tmdbId
            + "?api_key=9ff347d908a575c777ebecebe3fdcf6b&language=en-US";

        axios
            .get(tmdbUrl)
            .then(res => {
                this.setState({ poster: res.data.poster_path });
            })
            .catch(err => console.log("Small card: tmdb err"));

        // add authentication back
        const authheader = axios.defaults.headers.common["Authorization"] || null;
        axios.defaults.headers.common["Authorization"] = authheader;
    }

    render() {
        const baseUrl = "http://image.tmdb.org/t/p/w185_and_h278_bestv2/";

        return (
            <div className="card" style={style}>
                {/* redirect to movie details page */}
                <Link to={`/api/movies/mvdetails/${this.props.movie._id}`} >
                    <img className="card-img-top" src={baseUrl + this.state.poster} alt="movie poster" />
                </Link>
            </div>
        );
    }
}

export default MovieCardSmall;
