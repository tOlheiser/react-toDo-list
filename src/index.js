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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter a new task <br/>
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

class Footer extends React.Component {
    render() {
        return(
            <div>
                <div>
                    
                </div>
                
                <div>
                    
                </div>

                <div>
                
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
                    filter={this.state.filter}
                />
                <Footer
                    tasks={this.state.tasks}
                />
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


