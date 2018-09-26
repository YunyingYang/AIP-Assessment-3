import React, { Component } from 'react';
import axios from 'axios';

class ProfileMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            movie: "",//很多个电影，显示title，genres和rating
            rating: 0,
            errors: {}
        };
        // this.getTmdbData_detail = this.getTmdbData_detail.bind(this);
        // this.getTmdbData_video = this.getTmdbData_video.bind(this);
        // this.getTmdbData_cast = this.getTmdbData_cast.bind(this);
        // this.onChange = this.onChange.bind(this);
        // //this.onSubmit = this.onSubmit.bind(this);
        // this.changeRating = this.changeRating.bind(this);
    }

    componentWillMount() {
        axios
            .get(`/api/usermovieratings/user/${this.props.user._id}`)
            .then(res => {
                console.log(res.data);
                // this.setState({ user: res.data.user,
                //                 movie: res.data.movie,
                //                 rating: res.data.rating });
            })
            .catch(err => console.log(err));
    }

    render() {
        // const { user } = this.props;

        // const userMovieItems = user.map(rating => (
        //     <li key={exp._id} className="list-group-item">
        //         <h4>{exp.company}</h4>
        //         <p>
        //             <strong>User:</strong> {exp.title}
        //         </p>
        //         <p>
        //             {exp.location === '' ? null : (
        //                 <span>
        //                     <strong>Location: </strong> {exp.location}
        //                 </span>
        //             )}
        //         </p>
        //         <p>
        //             {exp.description === '' ? null : (
        //                 <span>
        //                     <strong>Description: </strong> {exp.description}
        //                 </span>
        //             )}
        //         </p>
        //     </li>
        // ));
        return (
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-center text-info">Movie Rated</h3>
                    {/* {userMovieItems.length > 0 ? (
                        <ul className="list-group">{userMovieItems}</ul>
                    ) : (
                            <p className="text-center">No Movie Rated By {user.name}</p>
                        )} */}
                </div>
            </div>
        );
    }
}

export default ProfileMovie;
