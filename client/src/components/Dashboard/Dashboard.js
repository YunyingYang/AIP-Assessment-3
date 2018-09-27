import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import axios from 'axios';
import isEmpty from '../../validation/is-empty';
import Background from "../../images/chatbg.jpg";

var sectionStyle = {
    width: "1000px",
    height: "600px",
    border: "5px solid #FFF",
    borderRadius: "20px 70px",
    // makesure here is String, following is ES6
    backgroundImage: `url(${Background})`
};

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usermovieratings: [],
            user: this.props.auth.user
        };
        this.onClickDelete = this.onClickDelete.bind(this); //！
    }

    componentWillMount() {
        //console.log(this.state.user.id);
        axios
            .get(`/api/usermovieratings/user/${this.state.user.id}`)
            .then(res => {
                console.log(res.data);
                this.setState({ usermovieratings: res.data });
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onClickDelete(id) {
        axios
            .delete(`/api/usermovieratings/${id}`)
            .then(res => {
                console.log(res.data);
                // axios
                //     .get(`/api/usermovieratings/user/${this.state.user.id}`)
                //     .then(res => {
                //         console.log(res.data);
                //         this.setState({ usermovieratings: res.data });
                //     })
                //     .catch(err => console.log(err));
                var ratingArray = this.state.usermovieratings;
                var removeIndex = ratingArray.map(function (rating) { return rating.id; })
                    .indexOf(id);
                ratingArray.splice(removeIndex, 1);
                this.setState({ usermovieratings: ratingArray })
                //TODO:删除页面上的条目或者rerender？
            })
            .catch(err => this.setState(console.log("cannot delete")));
    }

    render() {
        //const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        } else {
            //Check if logged in user has profile data
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-warning">
                            Welcome,&nbsp;
                            <Link to={`/profile/${profile.handle}`}>{this.state.user.name}</Link>
                        </p>
                        <ProfileActions />
                        <div style={{ marginBottom: '60px' }} />
                    </div>
                );
            } else {
                // User is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {this.state.user.name}</p>
                        <p>You have not yet setup a profile, please tell us a little about your self</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            <i className="fa fa-edit" />
                            Create Profile
            </Link>
                    </div>
                );
            }

        }
        const ratings = this.state.usermovieratings.map((usermovierating, index) => (

            <li key={index} className="p-3 d-flex">
                <div className="alert alert-dismissible alert-info justify-content-between">
                    <button type="button" className="close" onClick={() => this.onClickDelete(usermovierating.movie._id)}><i className="fa fa-minus-circle" /></button>
                    <Link to={`/api/movies/mvdetails/${usermovierating.movie._id}`}><span style={{ textDecoration: "none" }}><i className="fa fa-eye" />&nbsp;{usermovierating.movie.title}</span><span>&nbsp;</span><span className="badge badge-pill badge-info">{usermovierating.rating}</span></Link>
                </div>
            </li>
        ));

        return (
            <div className="dashboard">
                <div className="container" style={sectionStyle}>
                    <div className="row">
                        <div className="col-md-12" style={{ padding: "10px" }}>
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                            <hr />
                            <h3 className="text-center text-info">Manage Your Ratings</h3>
                            <div className="row">
                                <div className="d-flex flex-wrap justify-content-center align-items-center">
                                    {isEmpty(this.state.usermovieratings) ? (
                                        <p className="lead text-info">
                                            <span>{this.state.user.name} has not rated a movie</span>
                                        </p>
                                    ) : (<ul className="list-group">
                                        {ratings}
                                    </ul>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(
    Dashboard
);
