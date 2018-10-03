import React, {Component} from 'react';
import axios from "axios";

import MovieCardLarge from '../Homepage/MovieCardLarge';
import MovieCardMedium from '../Homepage/MovieCardMedium';

class Discover extends Component {
    constructor() {
        super();
        this.state = {
            movies: {},
            // isMounted: false
        }
    };

    componentDidMount() {
        // bug report: authentication conflicts with tmdb api and fanart.tv api
        // quick & dirty solution: delete authentication for now and add it back later >_<
        delete axios.defaults.headers.common["Authorization"];

        // this.setState({ isMounted: true }, () => {
        //     if (this.state.isMounted) {
                //get the weekly trending movies - for test -
                const url = new URL(
                    "https://api.themoviedb.org/3/trending/movie/week?api_key=9ff347d908a575c777ebecebe3fdcf6b"
                );

                axios
                    .get(url)
                    .then(res => {
                        console.log(res.data);
                        this.setState({ movies: res.data.results });
                    })
                    .catch(err => console.log("cannot get trending movies"));
        //     }
        // });

        // add authentication back
        const authheader = axios.defaults.headers.common["Authorization"] || null;
        axios.defaults.headers.common["Authorization"] = authheader;
    }

    // componentWillUnmount() {
    //     this.setState({ isMounted: false });
    //
    // }

    render() {
        if (!this.state.movies[0])
            return <div>Loading...</div>;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link">Browse By</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Year
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">All</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">1990s</a>
                                    <a className="dropdown-item" href="#">1980s</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Rating
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">All</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">5 stars</a>
                                    <a className="dropdown-item" href="#">4 stars</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Genres
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">All</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Comedy</a>
                                </div>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-secondary" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
                <br/>
                <br/>

                <h5>Recommend for You</h5>
                <div className="card-deck">
                    <MovieCardLarge movie={this.state.movies[0]} />
                    <MovieCardLarge movie={this.state.movies[1]} />
                </div>
                <br/>
                <br/>
                <div className="card-deck">
                    <MovieCardMedium movie={this.state.movies[2]} />
                    <MovieCardMedium movie={this.state.movies[3]} />
                    <MovieCardMedium movie={this.state.movies[4]} />
                </div>
                <br/>
                <br/>
            </div>
        );
    }
}

export default Discover;
