// import React
import React from 'react';
import ReactDOM from 'react-dom';

// import styles
import './reset.css';
import './index.css';

// import fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle as regularCircle} from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle as solidCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

const completedCheck = <FontAwesomeIcon icon={ solidCircle } />;
const activeCheck = <FontAwesomeIcon icon={ regularCircle } />;
const trashIcon = <FontAwesomeIcon icon={ faTrashAlt } />;

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.props.onInputChange(event.target.value);
    }

    // When submit is clicked, it invokes this function.
    handleSubmit(event) {
        // prevent default behaviour when you click submit.
        event.preventDefault();
      
        // When handleSubmit is invoked, it calls 'onSubmit()' 
        // which references another function that was passed in as props.
        this.props.onSubmit();
    }

    render() {
        // Used destructuring to grab 'value' from this.props and store it in a variable.
        const { value } = this.props;
        const isEnabled = value.length > 0;

        return (
            <div className="section center header">
                <form onSubmit={this.handleSubmit} className="flex red">
                    
                        <input type="text" placeholder="Enter a task" value={value} maxLength="36" onChange={this.handleChange} className="taskInput" />
                    
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
        this.handleTaskMouseOver = this.handleTaskMouseOver.bind(this);
        this.handleTaskMouseOut = this.handleTaskMouseOut.bind(this);
        this.filterList = this.filterList.bind(this);
    }

    /* Events */
    handleTaskClick(e) {
        this.props.onTaskClick(e);
    }

    handleTaskMouseOver(e) {
        this.props.onTaskMouseOver(e.currentTarget.id);
        
    }

    handleTaskMouseOut(e) {
        this.props.onTaskMouseOut(e.currentTarget.id);
        
    }

    filterList() {
        const { filter, tasks} = this.props;
        // If the filter is all, leave tasks as is. Otherwise, return an array of tasks which match the filter chosen.
        return filter === "All" ? tasks : tasks.filter(({status}) => status == filter);
    }

    render() {

        return(
            <div className="section center body">
                <ul className="red flex column">
                {// Mapping over the filtered list to produce task items.
                    this.filterList().map((task) => {
                        const {description, id, status, hideDelete} = task;
                        
                        return (
                            <div className="flex">
                            
                                <li className="flex taskItem space-between" key={id} id={id} onClick={(e) => this.handleTaskClick(e)} 
                                onMouseOver={this.handleTaskMouseOver} onMouseOut={this.handleTaskMouseOut}>

                                    <div className="flex vert-center">
                                        <button className="flex taskBtn">{status == "Active" ? activeCheck : completedCheck}</button>
                                        <span className={`flex ${status == "Active" ? "activeDesc" : "completedDesc"}`}>{description}</span>
                                    </div>
                            
                                    <div className="flex">
                                        <button className={hideDelete ? "hideBtn" : "revealBtn"}>{trashIcon}</button>
                                    </div>
                                </li>
                            </div>
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

        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);
        this.getTaskLength = this.getTaskLength.bind(this);
    }

    handleClearClick() {
        this.props.onClearClick();
    }

    handleFilterClick(event) {
        this.props.onFilterClick(event.target.innerHTML);
    }

    getTaskLength(taskStatus) {
        return this.props.tasks.filter(({status}) => status == taskStatus).length;
    }

    render() {
        const {filter, tasks} = this.props;

        return(
            <div className="section center footer">
                <div className="red flex space-between vert-center">
                    <div className="flex">
                        <span className="tally">{this.getTaskLength("Active")} {this.getTaskLength("Active") != 1 ? 'items' : 'item'} left</span>
                    </div>
                    
                    <div className="flex">
                        <button className={`${filter == "All" ? "currentFilter" : "btn"}`} onClick={this.handleFilterClick}>All</button>
                        <button className={`around ${filter == "Active" ? "currentFilter" : "btn"}`} onClick={this.handleFilterClick}>Active</button>
                        <button className={`${filter == "Completed" ? "currentFilter": "btn"}`} onClick={this.handleFilterClick}>Completed</button>
                    </div>

                    <div className="flex">
                        <button className={this.getTaskLength("Completed") > 0 ? "clear-btn" : "clear-hide"} 
                        onClick={this.props.onClearClick}>Clear completed [{this.getTaskLength("Completed")}]</button>
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
        this.getStatus = this.getStatus.bind(this);
        this.clearTasks = this.clearTasks.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.revealDeleteBtn = this.revealDeleteBtn.bind(this);
        this.hideDeleteBtn = this.hideDeleteBtn.bind(this);
        this.getFontAwesomeElement = this.getFontAwesomeElement.bind(this);
    }

    getStatus(position) {
        let currentTask = this.state.tasks.filter(task => task.id == position)[0];

        return currentTask.status === "Active" ? "Completed" : "Active";
    }

    handleInputChange(input) {
        this.setState({
            value: input,
        });
    }

    onTaskSubmit() {
        
        // store the user input.
        const description = this.state.value;
        // Counter is used to generate unique keys & id's.
        const counter = this.state.counter + 1;

        this.setState(({tasks}) => {
            return {
                counter: counter,
                value: '', // reset the input.
                tasks: [...tasks, {
                    hideDelete: true,
                    id: counter,
                    description,
                    status: "Active"
                }]
            }
        }) 
    }

    getFontAwesomeElement(node) {
        // Convuluted solution to return the className from the FontAwesome element.
        if (node.target.parentNode.nodeName == "DIV") {
            return node.target.className;

        } else if (node.target.parentNode.nodeName == "BUTTON") {
            return node.target.parentElement.className;

        } else if (node.target.parentNode.nodeName == "svg") {
            node = node.target.parentElement;
            node = node.parentElement.className;
            return node;
        } 
    }


    modifyTask = (dataFromChild) => {
        // Checks for which task the user clicked. 
        let taskId = dataFromChild.currentTarget.id; 
        let trashClass = this.getFontAwesomeElement(dataFromChild);

        // Did the user click the delete button?
        if (trashClass == "hideBtn" || trashClass == "revealBtn") {
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
                // If it is equal, toggle the status by using the 'getStatus' function.
                tasks: tasks.map((task) => (task.id == taskId ? { ...task, status: this.getStatus(taskId) } : task)),
            }));
        }
    }

    clearTasks() {
        this.setState({
            filter: "All",
            // Get a list of only the active tasks and apply it to the tasks object.
            tasks: this.state.tasks.filter(task => task.status == "Active")
        })
    }

    setFilter(filter) {
        this.setState({
            filter
        });
    }

    revealDeleteBtn(id) {
        this.setState(({tasks}) => ({
            tasks: tasks.map((task) => task.id == id ? { ...task, hideDelete: false } : task ),
        }))
    }

    hideDeleteBtn(id) {
        this.setState(({tasks}) => ({
            tasks: tasks.map((task) => task.id == id ? { ...task, hideDelete: true } : task ),
        }))
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
                    onTaskMouseOver={this.revealDeleteBtn}
                    onTaskMouseOut={this.hideDeleteBtn}
                />
                <Footer
                    tasks={this.state.tasks}
                    onClearClick={this.clearTasks}
                    onFilterClick={this.setFilter}
                    filter={this.state.filter}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


