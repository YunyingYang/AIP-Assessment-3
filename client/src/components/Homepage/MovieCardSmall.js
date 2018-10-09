import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import defaultImage from "../../images/dog-small.png";

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
        const authheader = axios.defaults.headers.common["Authorization"] || null;
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
            .catch(err => console.log("Tmdb error: tmdb database does not contain details of this movie"));

        axios.defaults.headers.common["Authorization"] = authheader;
    }

    render() {
        const imgUrl = "http://image.tmdb.org/t/p/w185_and_h278_bestv2/" + this.state.poster;

        return (
            <div className="card" style={style}>
                {/* redirect to movie details page */}
                <Link to={`/api/movies/mvdetails/${this.props.movie._id}`} >
                    {this.state.poster ? (
                        <img
                            className="card-img-top"
                            src={imgUrl}
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
            </div>
        );
    }
}

export default MovieCardSmall;
