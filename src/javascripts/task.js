import React, {Component} from 'react';
import $ from 'jquery';

class Task extends Component {

    state = {
        data: '',
        complete: false,
        tasks: [],
    };

    handleForm = (e) => {
        e.preventDefault();

        var data = {
            text: this.refs['new-task'].value
        };

        $.ajax({
            url: 'http://localhost:4000/tasks',
            method: 'post',
            data: data,
            dataType: 'json',
            success: function() {
                this.state.tasks.push({
                    id: Date.now(),
                    text: data.text
                });

                this.setState({
                    tasks: this.state.tasks
                });
                this.refs['user_form'].reset();
            }.bind(this)

        })
    };

    componentDidMount() {
        $.ajax({
            url: "http://localhost:4000/tasks",
            method: 'get',
            dataType: 'json',
            success: function(tasks) {
                this.setState({
                    tasks: tasks
                })
            }.bind(this)
        })
    };

    render() {
        var tasks = this.state.tasks.map( task => {
            return (
                <li key={task.id}>
                    <button className="checkbox">
                        <i className="fa fa-square-o fa-2x" />
                    </button>
                        {task.text}
                </li>
            )
        });

        return(
            <div className="task-wrapper">
                <form id="task-input" ref="user_form" onSubmit={this.handleForm}>
                    <input className="task-text" ref="new-task" placeholder="Add an item" autoFocus="true" />
                    <button className="task-button" type="submit">Submit</button>
                </form>
                <ul id="task-list">
                    {tasks}
                </ul>
            </div>
        )
    };
};

export default Task;
