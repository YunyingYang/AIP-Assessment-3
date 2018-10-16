import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

import { registerUser } from "../../actions/authActions";
import cross from "../../images/cross.png";

class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // for redirecting to dashboard if user exists
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // register a new user
  onSubmit(e) {
      e.preventDefault();

      const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
      };

      this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div
          className="container alert alert-dismissible alert-secondary"
          style={{ maxWidth: "40rem" }}
        >
            {/* redirect to homepage */}
          <Link to="/">
            <img
              src={cross}
              alt="Close"
              style={{
                width: "30px",
                height: "30px",
                float: "left",
                padding: "2px 2px"
              }}
            />
          </Link>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">User Signup</h1>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                    {/* validate user name */}
                    <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  {/* validate user email */}
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.onChange}
                    name="email"
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  {/* validate password */}
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                    name="password"
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                {/* validate confirm password */}
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    name="password2"
                    required
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input
                  type="submit"
                  className="btn btn-secondary btn-block mt-4"
                  value="Sign Up"
                />
                <br />
              </form>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

// for redux
RegisterPage.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(RegisterPage));
