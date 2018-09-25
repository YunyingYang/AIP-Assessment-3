import React, {Component} from 'react';
import axios from "axios";
import Star from './Star';

import img from '../../images/2.jpg';

const style = {
    width: '400px',
    height: '400px'
};


//数据库里的
// {
//     "_id": {
//     "$oid": "5ba4bd5e4cf8a6be6525b8d9"
// },
//     "movieId": 7441,
//     "title": "Thousand Clouds of Peace, A (2003)",
//     "genres": "Drama|Romance",
//     "imdbId": 358590,
//     "tmdbId": 163676
// }


//api传回来的
// {
//     "adult": false,
//     "backdrop_path": null,
//     "belongs_to_collection": null,
//     "budget": 0,
//     "genres": [],
//     "homepage": null,
//     "id": 163676,
//     "imdb_id": "tt0358590",
//     "original_language": "en",
//     "original_title": "Mil nubes de paz cercan el cielo, amor, jamás acabarás de ser amor",
//     "overview": "A teenager discovers that mending a broken heart is no simple thing in this independent romantic drama from Mexico. Gerardo (Juan Carlos Ortuno), a 17-year-old who has recently embraced his homosexuality, has just parted ways with his first serious boyfriend, Bruno (Juan Carlos Torres). Gerardo has fallen into a deep depression after losing Bruno, and he drifts through Mexico City, where he meets and makes love with a number of attractive strangers. However, his hedonistic adventures cannot wash away the pain in his heart. The first feature-length project from director Julian Hernandez, Mil Nubes de Paz Cercan el Cielo, Amor, Jamás Acabarás de Ser Amor was screened at the 2003 Berlin Film Festival, where it received the Teddy award, given to the best Gay or Lesbian-themed film shown at the fest.",
//     "popularity": 0.712,
//     "poster_path": "/pKTB6wCGwhaQqFVeIFUUeUS8H2F.jpg",
//     "production_companies": [],
//     "production_countries": [],
//     "release_date": "2003-05-26",
//     "revenue": 0,
//     "runtime": null,
//     "spoken_languages": [
//     {
//         "iso_639_1": "es",
//         "name": "Español"
//     }
// ],
//     "status": "Released",
//     "tagline": "",
//     "title": "A Thousand Clouds of Peace",
//     "video": false,
//     "vote_average": 4.3,
//     "vote_count": 4
// }



class MovieCardLarge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: "",
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
                this.setState({ description: res.data.overview,
                                poster: res.data.poster_path });
            })
    }

    render() {

        const imageURL = new URL(
            "http://image.tmdb.org/t/p/w185_and_h278_bestv2/"
        );

        return (
            <div className="card bg-light text-black" style={style}>
                {/*<img className="card-img-top" src={imageURL + this.state.poster} alt="movie poster" />*/}
                <img className="card-img-top" src={img} alt="movie poster" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <Star className="mr-3" />
                    <p className="card-text">{this.props.genres}</p>
                    <p className="card-text">{this.state.description}</p>
                </div>
            </div>
        );
    }
}

export default MovieCardLarge;
