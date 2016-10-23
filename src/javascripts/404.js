import React, { Component } from 'react';

class Notfound extends Component {

    render() {
        return (
            <div className="not-found">
                <h1>404</h1>
                <h2>Page not found!</h2>
                <p><a href="/">Go back to the main page</a></p>
            </div>
        )
    };
};

export default Notfound;
