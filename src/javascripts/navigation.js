import React, {Component} from 'react';

class Navigation extends Component {

    handleLogout() {
        this.props.logoutCallback();
        // TODO set state to loggedIn: false?
    };

    render() {
        return (
            <div className="navbar">
                <a className="brand" href="/">paper</a>

                { this.props.loggedIn ?
                    <ul className="right-nav">
                        <li><a onClick={this.handleLogout.bind(this)}>log out</a></li>
                    </ul>
                : null }
            </div>
        )
    }
};

export default Navigation;
