import React, { Component } from 'react';
import $ from 'jquery';

class Login extends Component {

    state = {
        loggedIn: false,
        existingUser: true
    };

    handleToggle() {
        this.state.existingUser = !this.state.existingUser;
        this.setState({
            existingUser: this.state.existingUser
        });
    };

    handleForm(e) {
        e.preventDefault();

        var email = this.refs.email.value;
        var password = this.refs.password.value;
        console.log(email);
        console.log(password);
        $.ajax({
            url: this.state.existingUser ? 'http://localhost:4000/login' : 'http://localhost:4000/register',
            method: this.state.existingUser ? 'get' : 'post',
            data: {
                email: email,
                password: password,
            },
            dataType: 'json',
            success: function() {
                this.props.loginCallback();
            }.bind(this),
            error: function(res) {
                alert(res.error)
            }
        });
    };

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleForm.bind(this)}>
                    <span className="login-intro">{this.state.existingUser ? 'Log in' : 'Create an account' }</span>
                    <input className="text email" ref="email" placeholder="email address" autoFocus="true" />

                    <input className="text password" ref="password" placeholder="password" />


                    <button className="button" type="submit">{this.state.existingUser ? 'Log in' : 'Create account'}</button>

                    <a className="login-link" onClick={this.handleToggle.bind(this)}>
                        {this.state.existingUser ? 'Create an account' : 'Have an account? Log in.'}
                    </a>
                </form>
            </div>
        );
    };
};

export default Login;
