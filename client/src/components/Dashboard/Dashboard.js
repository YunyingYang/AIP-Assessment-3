import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
// import Experience from './Experience';
// import Education from './Education';
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
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    //   onDeleteClick(e) {
    //     this.props.deleteAccount();
    //   }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        } else {
            //Check if logged in user has profile data
            if (Object.keys(profile).length > 0) {
                this.props.history.push(`/profile/${profile.handle}`);
                // dashboardContent = (
                //     <div>
                //         <p className="lead text-warning">
                //             Welcome,&nbsp;
                //             <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                //         </p>
                //         <ProfileActions />
                // <Experience experience={profile.experience} />
                //  <Education education={profile.education} /> */}
                //         <div style={{ marginBottom: '60px' }} />
                //     </div>
                // );
            } else {
                // User is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You have not yet setup a profile, please tell us a little about your self</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            <i className="fa fa-edit" />
                            Create Profile
            </Link>
                    </div>
                );
            }
        }

        return (
            <div className="dashboard">
                <div className="container" style={sectionStyle}>
                    <div className="row">
                        <div className="col-md-12" style={{ padding: "10px" }}>
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
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
