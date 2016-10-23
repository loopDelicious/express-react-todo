import React, {Component} from 'react';
import $ from 'jquery';

class Task extends Component {

    state = {
        data: '',
        complete: false,
        tasks: ['joyce','dan']
    };

    // handleForm(e) {
    //     e.preventDefault();
    //
    //     var data = this.refs.data.value;
    //
    //     $.ajax({
    //         url: this.state.complete ? '/xxx' : '/xxx',
    //         method: 'post',
    //         data: data,
    //         success() {
    //             this.props.loginCallback();
    //         },
    //         error(res) {
    //             alert(res.error)
    //         },
    //     })
    // };

    componentDidMount() {
        $.ajax({
            url: "http://localhost:4000/tasks",
            method: 'get',
            success: function(tasks) {
                this.setState({
                    tasks: tasks
                })
            }.bind(this)
        })
    };

    render() {
        var tasks = this.state.tasks.map( task => {
            return <li key={task}>{task}</li>
        });

        return(
            <div>
                <form id="task-input" onSubmit={this.handleForm}>
                    <input className="text task" ref="new-task" placeholder="Add an item" autoFocus="true" />
                    <button className="button" type="submit">Submit</button>
                </form>
                <ul id="task-list">
                    {tasks}
                </ul>
            </div>
        )
    };
};

export default Task;
