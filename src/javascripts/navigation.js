import React, {Component} from 'react';
import brand from '../images/3dDoge.gif';

class Navigation extends Component {
    render() {
        return (
            <div className="navbar">
                <a className="brand" href="/"><img src={brand} alt="paper" /></a>

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
