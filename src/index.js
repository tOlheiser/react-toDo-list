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
    }

    //

    handleTaskClick(e) {
        // Pass a reference to App. It grabs the index and uses that to alter state. 
        // have a funtion that returns the event.target.value?
        //console.log(event.target.value);
        
        this.props.onTaskClick(e.currentTarget.id);
        //console.log(event.currentTarget.id);
    }

    render() {

        return(
            <div className="section center body">
                <ul className="red flex column">
                    {this.props.tasks.map((task, index) => {
                        const {description/*, status*/} = task;

                        return (
                            <li key={index} className="flex taskItem vert-center" id={index} onClick={(e) => this.handleTaskClick(e)}>
                            <button className="taskBtn">Toggle Status</button><span className="flex desc">{description}</span><button className="taskBtn">Delete</button>
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
            value: '',
            filter: 'All',
            tasks: [],
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onTaskSubmit = this.onTaskSubmit.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
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

        this.setState(({tasks}) => {
            return {
                value: '', // reset the input.
                tasks: [...tasks, {
                    description,
                    status: 'Active'
                }]
            }
        }) 
    }

    toggleStatus = (dataFromChild) => {
        console.log(dataFromChild);
        this.setState(({tasks}) => ({
            tasks: tasks.map((task, index) => (index === 0 ? { ...task, status: "Complete" } : task)),
        }));
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


