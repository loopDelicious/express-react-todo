import React, { Component } from 'react';
import $ from 'jquery';

class Login extends Component {

    state = {
        existingUser: true,
        error: false
    };

    handleToggle() {
        this.state.existingUser = !this.state.existingUser;
        this.setState({
            existingUser: this.state.existingUser
        });
    };

    handleForm = (e) => {
        e.preventDefault();

        var email = this.refs.email.value;
        var password = this.refs.password.value;

        $.ajax({
            url: this.state.existingUser ? 'http://localhost:4000/login' : 'http://localhost:4000/register',
            method: 'post',
            data: {
                email: email,
                password: password
            },
            dataType: 'json',
            success: function () {
                this.setState({
                    existingUser: true
                });
                this.props.loginCallback();
            }.bind(this),
            error: function(err) {
                this.setState({
                    error: true
                });
            }
        })
    };

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleForm.bind(this)}>
                    <span className="login-intro">{this.state.existingUser ? 'Log in' : 'Create an account' }</span>

                    <input className="text email" ref="email" placeholder="email address" autoFocus="true" />
                    <input className="text password" ref="password" placeholder="password" />

                    <span className="error-message">{this.state.error ? 'Sorry, please try again' : null }</span>

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
