import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
// import InputGroup from '../common/InputGroup';
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";
import { Checkbox } from "antd";
import classnames from "classnames";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      location: "",
      status: "",
      bio: "",
      prefs: [], //Customized - 喜欢的电影genre(s)，多选框！自己以后自己加
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
    console.log("checked = ", checkedValues);
    this.setState({ prefs: checkedValues });
    console.log(this.state.prefs);
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    const CheckboxGroup = Checkbox.Group;

    const prefsOptions = [
      { label: "Drama", value: "Drama" },
      { label: "Comedy", value: "Comedy" },
      { label: "Romance", value: "Romance" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center text-white">
                Create Your Profile
              </h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.handle
                    })}
                    placeholder="Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    required
                  />
                  {errors.handle && (
                    <div className="invalid-feedback">{errors.handle}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="location"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.location
                    })}
                    placeholder="Location"
                    value={this.state.location}
                    onChange={this.onChange}
                    name="location"
                    required
                  />
                  {errors.location && (
                    <div className="invalid-feedback">{errors.location}</div>
                  )}
                </div>
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <CheckboxGroup
                  options={prefsOptions}
                  defaultValue={["Drama"]}
                  onChange={this.onCheckChange}
                />
                <br />
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Submit"
                />
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

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
