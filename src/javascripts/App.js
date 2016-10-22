import React, { Component } from 'react';
import logo from '../images/logo.svg';
import Login from './login.js';
import Navigation from './navigation.js';

class App extends Component {

    state = {
        loggedIn: false,
    };

    userLoggedIn() {
        this.setState({
            loggedIn: true,
        });
    };

    render() {
        return (
            <div className="App">
                <Navigation loggedIn={this.state.loggedIn} />
                {this.state.loggedIn ?
                    <div>
                        <div className="App-header">
                          <img src={logo} className="App-logo" alt="logo" />
                          <h2>Welcome to React</h2>
                        </div>
                        <p className="App-intro">
                          To get started, edit <code>src/App.js</code> and save to reload.
                        </p>
                    </div>
                : <Login loginCallback={this.userLoggedIn} /> }
          </div>
        );
    }
}

export default App;
