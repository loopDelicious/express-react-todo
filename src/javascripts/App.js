import React, { Component } from 'react';
import Login from './login.js';
import Navigation from './navigation.js';
import Task from './task.js';

class App extends Component {

    state = {
        loggedIn: false,
    };

    userLoggedOut = () => {
        this.setState({
            loggedIn: false
        });
    };

    userLoggedIn = () => {
        this.setState({
            loggedIn: true,
        });
    };

    render() {
        return (
            <div className="App">
                <Navigation logoutCallback={this.userLoggedOut} />
                {this.state.loggedIn ? <Task /> : <Login loginCallback={this.userLoggedIn} /> }
            </div>
        );
    }
}

export default App;
