import React, {Component} from 'react';

class Navigation extends Component {
    render() {
        return (
            <div className="navbar">
                <a className="brand" href="/">paper</a>

                { this.props.loggedIn ?
                    <ul className="right-nav">
                        <li><a href="/">log out</a></li>
                    </ul>
                : null }
            </div>
        )
    }
};

export default Navigation;
