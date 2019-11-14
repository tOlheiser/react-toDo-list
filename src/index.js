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
        return (
            <div className="section center header">
                <form onSubmit={this.handleSubmit} className="flex red">
                    
                        <input type="text" placeholder="Enter a task" value={this.props.value} onChange={this.handleChange} className="taskInput" />
                    
                    <input type="submit" value="Submit" className="taskSubmit" />
                </form>
            </div>
        );
    }
}

class Body extends React.Component {
    constructor(props) {
        super(props);

        this.handleTaskClick = this.handleTaskClick.bind(this);
        //let counter = this.state.counter + 1;
    }

    //let counter = this.state.counter + 1;

    handleTaskClick(e) {
        // Pass a reference to App. It grabs the index and uses that to alter state. 
        // have a funtion that returns the event.target.value?
        //console.log(event.target.value);
        //console.log(e.target);
        this.props.onTaskClick(e);
        //console.log(event.currentTarget.id);
    }

    render() {
        return(
            <div className="section center body">
                <ul className="red flex column">
                    {this.props.tasks.map((task) => {
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
    render() {
        return(
            <div className="section center footer">
                <div className="red flex space-between vert-center">
                    <div className="flex ">
                        <span className="tally"># item left</span>
                    </div>
                    
                    <div className="flex">
                        <button className="btn">All</button>
                        <button className="btn around">Active</button>
                        <button className="btn">Completed</button>
                    </div>

                    <div className="flex">
                        <button className="clear-btn">Clear completed</button>
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
        this.toggleStatus = this.toggleStatus.bind(this);
        this.grabStatus = this.grabStatus.bind(this);
    }

    grabStatus(position) {
        let status = this.state.tasks[position].status;

        console.log(`The status is ${this.state.tasks[position].status}`);
        if (status === 'Active') {
            status = 'Complete';
        } else {
            status = 'Active'
        } 

        return status;
    }

    handleInputChange(input) {
        this.setState({
            value: input,
        });
    }

    onTaskSubmit() {
        //event.preventDefault();
        
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
                    status: 'Active'
                }] // Add ID
            }
        }) 
    }

    toggleStatus = (dataFromChild) => {
        //e.currentTarget.id
        let taskIndex = dataFromChild.currentTarget.id; // Checks for which task the user clicked. 
        let taskClass = dataFromChild.target.className; // Use this to check if the user clicked on the delete button.

        console.log(dataFromChild.currentTarget.id);
        if (taskClass == "deleteBtn") {
            // remove task from state.
            let newList = this.state.tasks;
            newList = newList.filter((list) => list.status == 'Active'); //Works
            //console.log(`taskIndex: ${taskIndex}`);
            console.log(newList);
        } else {
            this.setState(({tasks}) => ({
                tasks: tasks.map((task, index) => (index == taskIndex ? { ...task, status: this.grabStatus(taskIndex) } : task)),
            }));
        }

        
    }

    /* 
            tasks: tasks.map((task, index) => (index == taskIndex ? { ...task, status: this.grabStatus(taskIndex) } : task)),
    */

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
                    onTaskClick={this.toggleStatus}
                    onDeleteClick={this.deleteTask}
                />
                <Footer
                    tasks={this.state.tasks}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


