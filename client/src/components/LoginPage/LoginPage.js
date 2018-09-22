import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import Background from "../../images/usermgmtbg.jpg";
import cross from "../../images/cross.png";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

var sectionStyle = {
  width: "600px",
  height: "410px",
  border: "3px solid #000",
  borderRadius: "20px 70px",
  // makesure here is String, following is ES6
  backgroundImage: `url(${Background})`
};

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div className="login">
        <div className="container" style={sectionStyle}>
          <Link to="/">
            <img
              src={cross}
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
              <br />
              <br />
              <h1
                className="display-4 text-center"
                style={{
                  color: "#FFF",
                  textShadow:
                    "0 2px #FF7F00, 2px 0 #FF7F00, -2px 0 #FF7F00, 0 -2px #FF7F00"
                }}
              >
                User Login
              </h1>
              {/* <p className = "lead text-center">
                                Log in with your Filmtopia account!
                            </p> */}
              <br />
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <br />
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Sign In"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginPage);
