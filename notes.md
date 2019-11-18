# To Do List Notes

**Don't render the body or footer if there are no tasks.**

## Body Component

Create a function which takes in a parameter (whatever the filter is) and then display the tasks according to the filter.

How every list item should render:
* Description with a button (toggles active/inactive)
* Hovering over a task displays a delete button
* Clicking on the task card toggles active/inactive stylings.
* *Should I use checkboxes?*
* *Use event.target to grab that task's index? Pass along that value to the App component?*

### Handling Task Items
Clicking anywhere on a task item will toggle its status. Essentially, you grab the 'key' off of that task's list item, and use that key as a means to select and modify the state of the item.
*Use 'console.log(event.target) to see what values you get and test this out.*

[Consider using this as an example to generate list items](https://reactjs.org/docs/lists-and-keys.html#extracting-components-with-keys)

## Footer Component

Three pieces to this:
1. Display # of Active tasks remaining.
2. Display 'All', 'Active', or 'Completed' tasks. -> Lift this to state.
*Consider mapping these out, and rendering the 'focused' button based on the state.*
3. Clear completed button.

### Number of Active Tasks Remaining
Have a function that returns an integer representing the number of Active tasks remaining.

1. Have a function which returns the number of 'active' tasks.
2. In the function, run the filter method on this.state.tasks to grab an array of tasks which contain the status 'Active'.
3. This function will return the length of that array.
4. If array.length != 1, it will read ${array.length} items left *logic to make sure 'items' is plural or not*

**Filter Buttons**
'All', 'Active', 'Completed'. Clicking on a button will update the corresponding filter in state.

1. run the filter method on this.state.tasks. You will pass in the filter value. 
2. It will return an array of the desired task items.
3. Map over the returned array to return list items. 
*If the filter is 'All', not sure how that will play out.*

### Clear Completed
A button that updates the state by removing the completed tasks from the array.

1. When clicked, it will reference a function in the parent component.
2. run a filter method on this.state.tasks, which returns an array of tasks which contain the status 'Active'.
3. update state by assigning that array to the 'tasks' key.
**Hide this button when there are no active tasks.

## Understanding Solutions

### Lifting State
```javascript
// Within the parent component.
// Issue: Passing data from child component to the parent component.
// Problem: Regular function statement did not work.
// Solution: Function expression worked.
// Why: ??

// Parent Component
toggleStatus = (dataFromChild) => {
        console.log(dataFromChild);
    }

// Child Component
onClick={this.handleTaskClick(e)} // Fails
onClick={(e) => this.handleTaskClick(e)} // Works

handleTaskClick(e) { // pass in the event object as the argument.
    // Take the event object and pass in the target
    this.props.onTaskClick(e.currentTarget.id); 
}
```

## Toggling the Status

```javascript
tasks.map(
    (task, index) => 
        (
            // are we looking at the first item in the list?
            index === 0
            // if yes, return a modified task (mapped task object)
            // task is an Object, so we return an Object that has
            // the original task spread into it
            // but we override the status property with our new value
            ? { ...task, status: "Complete" }
            // or return the task without modifying
            : task
        )
    )
```

## Improving my Filter Function
**Original**:

```javascript
filterList() {

        if (this.props.filter == "All") {
            return this.props.tasks.filter((task) => task.status == "Active" || task.status == "Complete");    
        } else if (this.props.filter == "Active") {
            return this.props.tasks.filter(task => task.status == "Active");    
        } else {
            return this.props.tasks.filter(task => task.status == "Complete");    
        }
    }
```

**Improved**:
```javascript
const { filter, tasks } = this.props;
return filter === "All" ? tasks : tasks.filter(({ status }) => status === filter);
```

## A lesson: Do not mutate the DOM, period. 

```javascript
<li className="flex taskItem vert-center" key={id} id={id} onClick={(e) => this.handleTaskClick(e)} 
onMouseOver={this.revealDeleteBtn} onMouseOut={this.hideDeleteBtn}>
<button className="taskBtn">Toggle Status</button><span className="flex desc">{description}</span>
<button className="deleteBtn">Delete</button>
</li>
```

When I hover over the list item, it behaves how I like it to (reveal delete button on mouse over, hide it when mouse out). However, whenever I hover over any of the elements inside the list item (toggle button, text span, delete button), it hides the delete button.

Is there a way of getting around having to apply the mouseOver and mouseOut to every element nested inside the list item?

**The error? I tried to mutate the DOM directly.**
```javascript
hideDeleteBtn(e) { 
    e.target.lastChild.className = "deleteBtn hideBtn";
}
```

**Solution: Render based on state instead**
handle event => set state => render based on state
this is the basic pattern of everything in react
aka flux - slightlytyler

if you mutate the dom, you bypass React lifecycle components so it doesn't necessarily re-render. setState is Reacts way of telling parts of the DOM that the component has changed and needs to be rerendered to reflect the updates in the state.
just setState and be happy - Sesh from Reactiflux

## Why does one work and not the other?

**Works**
```javascript
 this.setState(({tasks}) => ({
    tasks: tasks.map((task) => task.id == id ? { ...task, hideDelete: false } : task ),
}))
```

**Does not work**
```javascript
this.setState({
    tasks: tasks.map(task => task.id == id ? task.hideDelete = false : task.hideDelete = true)
})
```

## Prior to Publishing: Improvements I'd like to make
* Touch up the positioning. Equal spacing between list items and header/fooder/side edges. Also try to make footer items align better.
* Look at projects done by more experienced devs and organize your code similar to theirs.
* When double-clicking a task item, convert it to a text input to be edited. *Also include a pencil icon to enter this state.*
* Modify the delete button functionality (currently very hacky, lack experience with FontAwesome)
* Use LocalStorage to preserve tasks.
* Raise the limit of max character to have the words wrap, creating a larger list item.
* Consider including a down arrow on the left side of the text input. Clicking on it will check all tasks as completed. 
* Modify the submit styles when it was set to disabled.

## Knowledge gaps encountered during this project
* The spread operator, and how it was used to add a new task.
* map & filter.
* destructuring.
* short-circuit evaluation.
* Updating a nested property while updating state.
* Passing data from child to parent component.