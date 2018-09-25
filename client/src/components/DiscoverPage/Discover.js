import React, {Component} from 'react';

import MovieCardLarge from '../Homepage/MovieCardLarge';
import MovieCardMedium from '../Homepage/MovieCardMedium';


const Discover = () => {
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
                <MovieCardLarge/>
                <MovieCardLarge/>
            </div>
            <br/>
            <br/>
            <div className="card-deck">
                <MovieCardMedium/>
                <MovieCardMedium/>
                <MovieCardMedium/>
            </div>
            <br/>
            <br/>

        </div>
    );
};

export default Discover;
