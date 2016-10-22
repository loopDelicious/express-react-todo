import React, { Component } from 'react';
import $ from 'jquery';

class Login extends Component {

    state = {
        loggedIn: false,
        existingUser: true
    };

    handleToggle() {
        this.setState({
            existingUser: !this.state.existingUser
        });
    };

    handleForm(e) {
        e.preventDefault();

        var email = this.refs.email.value;
        var password = this.state.existingUser ? this.refs.password.value : null;

        $.ajax({
            url: this.state.existingUser ? '/login': '/register',
            method: 'post',
            data: {
                email: email,
                password: password,
            },
            success() {
                this.props.loginCallback();
            },
            error(res) {
                alert(res.error)
            },
        })
    };

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleForm}>
                    <span className="login-intro">{this.state.existingUser ? 'Log in' : 'Create an account' }</span>
                    <input className="text email" ref="email" placeholder="email address" autoFocus="true" />
                    {this.state.existingUser ?
                        <input className="text password" ref="password" placeholder="password" />
                        : null}

                    <button className="button" type="submit">Submit</button>

                    <a className="login-link" onClick={this.handleToggle}>
                        {this.state.existingUser ? 'Create an account' : 'Have an account? Log in.'}
                    </a>
                </form>
            </div>
        );
    };
};

export default Login;
