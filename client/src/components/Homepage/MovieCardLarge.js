import React, {Component} from 'react';
import {Link} from "react-router-dom";
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
            title: "",
            rating: "",
            overview: "",
            images: {}
        };
        // this.modifyMovieDetail = this.modifyMovieDetail.bind(this);
    }

    componentDidMount() {
        // bug report: authentication conflicts with tmdb api and fanart.tv api
        // quick & dirty solution: delete authentication for now and add it back later >_<
        const authheader = axios.defaults.headers.common["Authorization"] || null;
        delete axios.defaults.headers.common["Authorization"];

        // get movie details from tmdb api
        const tmdbUrl = new URL(
            "https://api.themoviedb.org/3/movie/" +
            this.props.movie.tmdbId +
            "?api_key=9ff347d908a575c777ebecebe3fdcf6b&language=en-US"
        );

        axios
            .get(tmdbUrl)
            .then(res => {
                this.setState({ title: res.data.title });
                //如果评论太长就截取前面的，找到长度350之前第一个空格，截取空格前面的，加上"..."，以后再修
                this.setState({ overview: res.data.overview.substring(0, 300) });
                this.setState({ rating: res.data.vote_average });
            })
            .catch(err => console.log("Large card: tmdb err"));

        // get movie stills from fanart.tv api
        const fanartUrl = new URL(
            "https://webservice.fanart.tv/v3/movies/" +
            this.props.movie.tmdbId +
            "?api_key=33f74d6cff548383dab95ca4f8901333"
        );

        axios
            .get(fanartUrl)
            .then(res => {
                this.setState({ images: res.data.moviebackground[0] });
                // console.log(this.state.images);
            })
            .catch(err => console.log("Large card: fanart err"));


        // add authentication back
        axios.defaults.headers.common["Authorization"] = authheader;
    }
    //
    // modifyMovieDetail() {
    //     // cut movie overview if it's too long
    //     let movieOverview = this.state.overview;
    //     if (movieOverview.length > 350) {
    //         let newOverview = movieOverview.substring(0, 350) + "...";
    //         this.setState({ overview: newOverview });
    //     }
    //
    //
    // }



    render() {
        if (!this.state.images) {
            return (<div>Loading...</div>);
        }

        // if you want to get a smaller preview of images: replace fanart with preview in url
        // before: http://assets.fanart.tv/fanart/movies/145220/hdmovielogo/muppets-most-wanted-53c1385817504.png
        // after: http://assets.fanart.tv/preview/movies/145220/hdmovielogo/muppets-most-wanted-53c1385817504.png
        // let imgSource = this.state.images.url;
        // let imgURL = imgSource.replace("assets.fanart.tv/fanart", "assets.fanart.tv/preview");

        let imgURL = this.state.images.url;

        return (
            <div className="card bg-light text-black" style={style} >
                {/* redirect to movie details page */}
                <Link to={`/api/movies/mvdetails/${this.props.movie._id}`} >
                    <img className="card-img-top" src={imgURL} alt="movie poster" />
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{this.state.title}</h5>
                    <Star className="mr-3" rate={this.state.rating} />
                    <p className="card-text">{this.props.movie.genres}</p>
                    <p className="card-text">{this.state.overview}</p>
                </div>
            </div>
        );
    }
}

export default MovieCardLarge;
