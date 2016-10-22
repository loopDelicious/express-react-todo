import React, {Component} from 'react';
import $ from 'jquery';

class Task extends Component {

    state = {
        data: '',
        complete: false
    };

    handleForm(e) {
        e.preventDefault();

        var data = this.refs.data.value;

        $.ajax({
            url: this.state.complete? '/xxx' : '/xxx',
            method: 'post',
            data: data,
            success() {
                this.props.loginCallback();
            },
            error(res) {
                alert(res.error)
            },
        })
    };

    render() {
        return(
            <div>
                <form id="task-input" onSubmit={this.handleForm}>
                    <input className="text task" ref="new-task" placeholder="Add an item" autoFocus="true" />
                    <button className="button" type="submit">Submit</button>
                </form>
                <div id="task-list">
                    
                </div>
            </div>
        )
    };
};

export default Task;
