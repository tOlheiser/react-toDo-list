import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.props.onInputChange(event.target.value);
    }

    handleSubmit(event) {
        event.preventDefault();
      
        this.props.onSubmit();
    }

    render() {
        const { value } = this.props;
        const isEnabled = value.length > 0;

        return (
            <div className="section center header">
                <form onSubmit={this.handleSubmit} className="flex red">
                    
                        <input type="text" placeholder="Enter a task" value={this.props.value} onChange={this.handleChange} className="taskInput" />
                    
                    <input type="submit" value="Submit" className="taskSubmit" disabled={!isEnabled}/>
                </form>
            </div>
        );
    }
}

class Body extends React.Component {
    constructor(props) {
        super(props);

        this.handleTaskClick = this.handleTaskClick.bind(this);
        this.filterList = this.filterList.bind(this);
    }

    handleTaskClick(e) {
        this.props.onTaskClick(e);
    }

    filterList() {
        const { filter, tasks} = this.props;
        return filter === "All" ? tasks : tasks.filter(({status}) => status == filter);
    }

    render() {
        return(
            <div className="section center body">
                <ul className="red flex column">
                {this.filterList().map((task) => {
                        const {description, id} = task;
                        
                        return (
                            <li className="flex taskItem vert-center" key={id} id={id} onClick={(e) => this.handleTaskClick(e)}>
                            <button className="taskBtn">Toggle Status</button><span className="flex desc">{description}</span><button className="deleteBtn">Delete</button>
                            </li>
                        )
                    })}
                    
                </ul>
            </div>
        )
    }
}

class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.getActiveTasks = this.getActiveTasks.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);
    }

    getActiveTasks() {
        return this.props.tasks.filter(task => task.status == "Active").length;
    }

    handleClearClick() {
        this.props.onClearClick();
    }

    handleFilterClick(event) {
        this.props.onFilterClick(event.target.innerHTML);
    }

    render() {

        return(
            <div className="section center footer">
                <div className="red flex space-between vert-center">
                    <div className="flex ">
                        <span className="tally">{this.getActiveTasks()} {this.getActiveTasks() != 1 ? 'items' : 'item'} left</span>
                    </div>
                    
                    <div className="flex">
                        <button className="btn" onClick={this.handleFilterClick}>All</button>
                        <button className="btn around" onClick={this.handleFilterClick}>Active</button>
                        <button className="btn" onClick={this.handleFilterClick}>Completed</button>
                    </div>

                    <div className="flex">
                        {this.props.tasks.filter(({status}) => status == "Completed").length > 0 && <button className="clear-btn" onClick={this.props.onClearClick}>Clear completed [{this.props.tasks.filter(task => task.status == "Completed").length}]</button>}
                    </div>
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            value: '',
            filter: 'All',
            tasks: [],
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onTaskSubmit = this.onTaskSubmit.bind(this);
        this.modifyTask = this.modifyTask.bind(this);
        this.grabStatus = this.grabStatus.bind(this);
        this.clearTasks = this.clearTasks.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    grabStatus(position) {
        let currentTask = this.state.tasks.filter(task => task.id == position);

        if (currentTask[0].status === "Active") {
            return "Completed";
        } else {
            return "Active";
        } 
    }

    handleInputChange(input) {
        this.setState({
            value: input,
        });
    }

    onTaskSubmit() {
        
        // store the user input.
        const description = this.state.value;
        const counter = this.state.counter + 1;

        this.setState(({tasks}) => {
            return {
                counter: counter,
                value: '', // reset the input.
                tasks: [...tasks, {
                    id: counter,
                    description,
                    status: "Active"
                }] // Add ID
            }
        }) 
    }

    modifyTask = (dataFromChild) => {
        let taskId = dataFromChild.currentTarget.id; // Checks for which task the user clicked. 
        let taskClass = dataFromChild.target.className; // Use this to check if the user clicked on the delete button.

        // Did the user click the delete button?
        if (taskClass == "deleteBtn") {
            // Create a list which doesn't contain the item the user would like to delete. 
            let newList = this.state.tasks.filter(task => task.id != taskId);

            // Assign that list to the tasks key.
            this.setState({
                tasks: newList
            });
        // Otherwise, toggle the status of the item.
        } else {
            this.setState(({tasks}) => ({
                // Map over the tasks and check to see if the task ID is equal to the value passed in.
                // If it is equal, toggle the status by using the 'grabStatus' function.
                tasks: tasks.map((task) => (task.id == taskId ? { ...task, status: this.grabStatus(taskId) } : task)),
            }));
        }
    }

    clearTasks() {
        this.setState({
            filter: "All",
            tasks: this.state.tasks.filter(task => task.status == "Active")
        })
    }

    setFilter(filter) {
        this.setState({
            filter
        });
    }

    render() {
        return (
            <div className="container">
                <Header 
                    value={this.state.value}
                    onSubmit={this.onTaskSubmit}
                    onInputChange={this.handleInputChange}
                />
                <Body 
                    tasks={this.state.tasks}
                    filter={this.state.filter}
                    onTaskClick={this.modifyTask}
                    onDeleteClick={this.deleteTask}
                />
                <Footer
                    tasks={this.state.tasks}
                    onClearClick={this.clearTasks}
                    onFilterClick={this.setFilter}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


