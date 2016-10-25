import React, {Component} from 'react';
import $ from 'jquery';

class Tasks extends Component {

    state = {
        tasks: [], // [{11.10.19, 'take out garbage},...]
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
            success: function(obj) {
                this.state.tasks.push(obj);
                this.setState({
                    tasks: this.state.tasks
                });
                this.refs['user_form'].reset();
            }.bind(this)

        })
    };

    handleTaskToggle = (index) => {
        this.state.tasks[index].complete = !this.state.tasks[index].complete;
        this.setState({
            tasks: this.state.tasks
        });
    };

    handleListSave() {
        if (this.state.tasks.complete == false) {
            
        }
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
        var tasks = this.state.tasks.map( (task, i) => {
            return (
                <li key={task.id}>

                    <label className="switch">
                        <input type="checkbox"
                               onChange={this.handleTaskToggle.bind(null, i)}
                               className={task.complete ? 'complete' : 'not-complete'}
                               checked={task.complete}
                        />
                        <div className="fa fa-square-o fa-2x"></div>
                    </label>
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
                <button className="confirmation-button" type="submit" onSubmit={this.handleListSave}>
                    Save Changes
                </button>
            </div>
        )
    };
};

export default Tasks;
