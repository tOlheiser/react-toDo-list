import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
1. The Header component contains a form field. User submit a task.
2. Submitted task gets lifted to the parent component, App, and App passes that data to the Body component.
3. You setState on the App component based on the previous state, appending the task as an object to the App component's state. The App passes down the tasks as props to the Body component.
The object contains the 'description' and a 'status' keys. 
4. You map over the tasks in the Body's props and create list items. (I think this is where destructuring in the parameter comes into play)
- These list items have the description, status, and delete functionality. Clicking on them will toggle the status.
5. The Footer does three things:
- Displays the amount of 'Active' tasks remain.
- Provides filter functionality 'All', 'Active', 'Completed'
- Button to 'Clear Completed'
*/

/* Unsure of:
1. Lifting state. Creating a diagram to visualize the flow of data would be a great learning tool.  
*/




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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Hello Kevin <br/>
                        <input type="text" value={this.props.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

class Body extends React.Component {
    /*constructor(props) {
        super(props);

    }*/

    render() {
        return(
            <div>
                <ul>
                    {this.props.tasks.map((task, index) => {
                        const {description/*, status*/} = task;

                        return (
                            <li key={index}>{description}</li>
                        )
                    })}
                    
                </ul>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            tasks: [],
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onTaskSubmit = this.onTaskSubmit.bind(this);
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

    render() {
        return (
            <React.Fragment>
                <Header 
                    value={this.state.value}
                    onSubmit={this.onTaskSubmit}
                    onInputChange={this.handleInputChange}
                />
                <Body 
                    tasks={this.state.tasks}
                />
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


