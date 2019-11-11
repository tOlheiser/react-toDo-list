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

class App extends React.Component {

    render() {
        return (
            <Header />
        );
    }
}


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            tasks: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Hello Kevin <br/>
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


