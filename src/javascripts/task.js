import React, {Component} from 'react';
import $ from 'jquery';

class Tasks extends Component {

    state = {
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

    handleListSave = () => {
        var new_completed = this.state.tasks.filter( (task) => {
            return task.complete == true;
        }).map( (task) => {
            return task.id;
        });

        // var new_completed = [];
        //
        // this.state.tasks.reduce( (new_completed, task) => {
        //     if (task.complete == true) {
        //         new_completed.push({
        //             id: task.id
        //         });
        //     }
        //     return new_completed;
        // }, []);

        $.ajax({
            url: 'http://localhost:4000/tasks/update',
            method: 'post',
            data: new_completed,
            dataType: 'json',
            success: function() {
                alert('success');
            }.bind(this)
        })
    };

    // TODO display tasks that are not-complete ONLY after Save button

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
                        <div className="slider round"></div>
                    </label>
                    {task.text}
                </li>
            )
        });

        var complete_count = this.state.tasks.filter( (task) => {
            return task.complete == true;
        }).length;

        return(
            <div className="task-wrapper">
                <form id="task-input" ref="user_form" onSubmit={this.handleForm}>
                    <input className="task-text" ref="new-task" placeholder="Add an item" autoFocus="true" />
                    <button className="task-button" type="submit">Add</button>
                </form>
                <ul id="task-list">
                    {tasks}
                </ul>
                { complete_count > 0 ?
                    <button className={(complete_count > 0 ? 'enabled' : 'disabled') + ' button'}
                            onClick={this.handleListSave}>
                        Save Changes
                    </button>
                    : null }
            </div>
        )
    };
};

export default Tasks;
