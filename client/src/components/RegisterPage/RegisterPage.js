import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Background from '../../images/usermgmtbg.jpg';
import cross from '../../images/cross.png';

var sectionStyle = {
    width: "600px",
    height: "520px",
  // makesure here is String, following is ES6
    backgroundImage: `url(${Background})` 
  };

class RegisterPage extends Component {

    constructor(){
        super();
        this.state = {
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:{}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
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
            .catch(err => console.log(err.response.data));
    }


    render() {
        return (
            <div className = "register">
                <div className = "container" style={sectionStyle}>
                <Link to='/'><img src={cross} style={{width:  '30px', height: '30px', float: 'left', padding: '2px 2px'}} /></Link>
                    <div className = "row">
                        <div className = "col-md-8 m-auto">
                        <br/>
                        <br />
                            <h1 className = "display-4 text-center" style={{ color: "#FF7F00", textShadow: "0 2px #6B4226, 2px 0 #6B4226, -2px 0 #6B4226, 0 -2px #6B4226"}}>
                                User Signup
                            </h1>
                            {/* <p className = "lead text-center">
                                Create your Filmtopia account
                            </p> */}
                            <br />
                            <form onSubmit={this.onSubmit} >
                                <div className = "form-group">
                                    <input type = "text"
                                           className = "form-control form-control-lg"
                                           placeholder = "Name"
                                           name = "name"
                                           value = {this.state.name}
                                           onChange = {this.onChange}
                                           required/>
                                </div>
                                <div className = "form-group">
                                    <input type = "email"
                                           className = "form-control form-control-lg"
                                           placeholder = "Email Address"
                                           value = {this.state.email}
                                           onChange={this.onChange}
                                           name = "email"
                                           required/>

                                    {/* <small className="form-text text-muted">
                                        This site uses Gravatar so if you want a
                                        profile image, use a Gravatar email
                                    </small> */}
                                </div>
                                <div className = "form-group">
                                    <input type = "password"
                                           className = "form-control form-control-lg"
                                           placeholder = "Password"
                                           value = {this.state.password}
                                           onChange={this.onChange}
                                           name = "password"
                                           required/>
                                </div>
                                <div className = "form-group">
                                    <input type = "password"
                                           className = "form-control form-control-lg"
                                           placeholder = "Confirm Password"
                                           value = {this.state.password2}
                                           onChange={this.onChange}
                                           name = "password2"
                                           required/>
                                </div>
                                <br />
                                <input type = "submit" className = "btn btn-primary" value = "Sign Up"/>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterPage;