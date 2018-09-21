import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';
import { Checkbox, Row, Col } from 'antd';
import classnames from 'classnames';
import Background from "../../images/chatbg.jpg";
import "./EditProfile.css"
//import CheckBoxGroup from '../common/CheckBoxGroup';

var sectionStyle = {
    width: "1000px",
    // height: "600px",
    border: "5px solid #FFF",
    borderRadius: "20px 70px",
    // makesure here is String, following is ES6
    backgroundImage: `url(${Background})`
};

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            location: '',
            status: '',
            bio: '',
            prefs: [],//Customized - 喜欢的电影genre(s)，多选框！自己以后自己加
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
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

    onCheckChange(checkedValues) {
        console.log('checked = ', checkedValues);
        this.setState({ prefs: checkedValues });
        console.log(this.state.prefs);
    }

    render() {
        const { errors } = this.state;

        // Select options for status
        const options = [
            { label: '* Select Movie Lover Status', value: 0 },
            { label: 'Not interested', value: 'Not interested' },
            { label: 'Movie novice', value: 'Movie novice' },
            { label: 'Movie lover', value: 'Movie lover' },
            { label: 'Fanatic', value: 'Fanatic' },
            { label: 'Other', value: 'Other' }
        ];

        const prefsOptions = [
            { label: 'Drama', value: 'Drama' },
            { label: 'Comedy', value: 'Comedy' },
            { label: 'Romance', value: 'Romance' },
        ];

        return (
            <div className="create-profile">
                <div className="container" style={sectionStyle}>
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form noValidate onSubmit={this.onSubmit} >
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, nickname, etc."
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City or city & state suggested (eg. Sydney, Melbourne)"
                                />
                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.status}
                                    info="Give us an idea of how much you like movies"
                                />
                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />
                                <div className="checkboxes" >
                                    <Checkbox.Group style={{ width: '100%' }}
                                        onChange={this.onCheckChange}
                                        defaultValue={this.state.prefs}>
                                        <Row>
                                            <Checkbox value="Drama">Drama</Checkbox>
                                            <Col span={4}><Checkbox value="Romance">Romance</Checkbox></Col>
                                            <Col span={4}><Checkbox value="Mucical">Mucical</Checkbox></Col>
                                            <Col span={4}><Checkbox value="Comedy">Comedy</Checkbox></Col>
                                            <Col span={4}><Checkbox value="Sci-Fi">Sci-Fi</Checkbox></Col>
                                        </Row>
                                    </Checkbox.Group>

                                    {/* <Checkbox.Group options={prefsOptions}
                                        // defaultValue={['Drama']} 
                                        onChange={this.onCheckChange} /> */}
                                </div>
                                {/* <CheckBoxGroup
                                    placeholder="Prefs"
                                    name="status"
                                    value={this.state.prefs}
                                    onChange={this.onCheckChange}
                                    options={prefsOptions}
                                    error={errors.status}
                                    info="Tell us what kind of movies do you like" /> */}
                                <br />
                                <input type="submit" className="btn btn-info btn-block mt-4" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
    withRouter(CreateProfile)
);