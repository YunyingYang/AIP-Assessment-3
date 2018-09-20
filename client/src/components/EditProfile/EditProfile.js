import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

import { Checkbox } from 'antd';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            location: '',
            status: '',//几级电影发烧友
            bio: '',
            prefs: [],//Customized - 喜欢的电影genre(s)，多选框！自己以后自己加
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            //       // Bring skills array back to CSV
            //       const skillsCSV = profile.skills.join(',');

            // If profile field doesnt exist, make empty string
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.prefs = !isEmpty(profile.prefs) ? profile.prefs : [];//TODO: 从多选框获得数列啊！

            // Set component fields state
            this.setState({
                handle: profile.handle,
                location: profile.location,
                status: profile.status,
                bio: profile.bio,
                prefs: profile.prefs
            });
        }
    }

    onCheckChange(checkedValues) {
        console.log('checked = ', checkedValues);
        this.setState({ prefs: [...this.state.prefs, checkedValues] });//去掉重复值？
        console.log(this.state.prefs);
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            location: this.state.location,
            status: this.state.status,
            bio: this.state.bio,
            prefs: this.state.prefs
        };

        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        // Select options for status 
        //TODO: 改成咱们的state！
        const options = [
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];

        const CheckboxGroup = Checkbox.Group;

        const prefsOptions = [
            { label: 'Drama', value: 'Drama' },
            { label: 'Comedy', value: 'Comedy' },
            { label: 'Romance', value: 'Romance' },
        ];

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/" className="btn btn-light">
                                Go Back</Link>
                            <h1 className="display-4 text-center">Edit Profile</h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                {/* <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="customCheck1" checked="" />
                                    <label class="btn btn-primary active" for="customCheck1">Drama</label>
                                    <input type="checkbox" class="custom-control-input" id="customCheck2" checked="" />
                                    <label class="btn btn-primary" for="customCheck2">Romance</label>
                                    <input type="checkbox" class="custom-control-input" id="customCheck3" checked="" />
                                    <label class="btn btn-primary" for="customCheck3">Comedy</label>
                                </div> */}
                                <div>
                                    {/* <SelectListGroup */}
                                    {/* //     placeholder="Status"
                                    //     name="status"
                                    //     value={this.state.status}
                                    //     onChange={this.onChange}
                                    //     options={options}
                                    //     error={errors.status}
                                    //     info="Give us an idea of where you are at in your career"
                                    // />
                                    // <TextAreaFieldGroup */}
                                    {/* //     placeholder="Short Bio"
                                    //     name="bio"
                                    //     value={this.state.bio}
                                    //     onChange={this.onChange}
                                    //     error={errors.bio}
                                    //     info="Tell us a little about yourself"
                                    // /> */}
                                    <CheckboxGroup options={prefsOptions} defaultValue={['Drama']} onChange={this.onCheckChange} />
                                    <br /><br />
                                </div>
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(Dashboard)
);
