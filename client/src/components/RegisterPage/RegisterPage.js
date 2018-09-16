import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Background from '../../images/usermgmtbg.jpg';
import cross from '../../images/cross.png';

var sectionStyle = {
    width: "600px",
    height: "520px",
    // makesure here is String, following is ES6
    backgroundImage: `url(${Background})`
};

class RegisterPage extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        axios.post('/api/users/register', newUser)
            .then(res => console.log(res.data))
            .catch(err => this.setState({ errors: err.response.data }));
    }


    render() {

        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container" style={sectionStyle}>
                    <Link to='/'><img src={cross} style={{ width: '30px', height: '30px', float: 'left', padding: '2px 2px' }} /></Link>
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center" style={{ color: "#FFF", textShadow: "0 2px #FF7F00, 2px 0 #FF7F00, -2px 0 #FF7F00, 0 -2px #FF7F00" }}>
                                User Signup
                            </h1>
                            {/* <p className = "lead text-center">
                                Create your Filmtopia account
                            </p> */}
                            <form noValidate onSubmit={this.onSubmit} >
                                <div className="form-group">
                                    <input type="text"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.name
                                        })}
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        required />
                                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                                </div>
                                <div className="form-group">
                                    <input type="email"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.email
                                        })}
                                        placeholder="Email Address"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        name="email"
                                        required />

                                    {/* <small className="form-text text-muted">
                                        This site uses Gravatar so if you want a
                                        profile image, use a Gravatar email
                                    </small> */}
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.password
                                        })}
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        name="password"
                                        required />
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.password2
                                        })}
                                        placeholder="Confirm Password"
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                        name="password2"
                                        required />
                                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                                </div>
                                <br />
                                <input type="submit" className="btn btn-primary" value="Sign Up" />
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterPage;