import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Background from '../../images/usermgmtbg.jpg';
import cross from '../../images/cross.png';

var sectionStyle = {
    width: "600px",
    height: "370px",
    // makesure here is String, following is ES6
    backgroundImage: `url(${Background})`
};

class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(user);
    }

    render() {
        return (
            <div className="login">
                <div className="container" style={sectionStyle}>
                    <Link to='/'><img src={cross} style={{ width: '30px', height: '30px', float: 'left', padding: '2px 2px' }} /></Link>
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <br />
                            <h1 className="display-4 text-center" style={{ color: "#FFF", textShadow: "0 2px #FF7F00, 2px 0 #FF7F00, -2px 0 #FF7F00, 0 -2px #FF7F00" }}>
                                User Login
                            </h1>
                            {/* <p className = "lead text-center">
                                Log in with your Filmtopia account!
                            </p> */}
                            <br />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="email"
                                        className="form-control form-control-lg"
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        required />
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        required />
                                </div>
                                <br />
                                <input type="submit" className="btn btn-primary" value="Sign In" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;