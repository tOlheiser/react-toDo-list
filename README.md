# React To-do List

I gathered inspiration from:
* [This design](https://www.youtube.com/watch?v=2wCpkOk2uCg&t=19s)
* [This footer](https://todomvc-app.herokuapp.com/#/)

I will not be looking at the code for these projects until after I've completed the app. Only to see how the creator reached the same solution.

## Functionality

### Header
**Add Item Field**: When you submit an item, it creates a new 'Todo Item' in the body. 

**When a user submits a new task:**
* Validate the text field (must be greater than 1 character).
* Add the newly created task to the bottom of the task list with the default 'Active' stylings. 
* Update 'Tasks Remaining' in the filter bar. 

### Body
The body renders all the Todo items and displays them according to the filter chosen.

**Todo Item**: Displays a column of todo items, each containing checkmarks which indicate that a task is active or completed. Active items have check marks with an empty circle, and completed items have checkmarks with a coloured circle. 

Clicking anywhere on an item (except for the trash can) will toggle it between 'active' and 'completed' states. Hovering over the trash can will turn its colour red, and clicking on it will prompt the user for confirmation.  

*Note: I'd like to create functionality where you can inline-edit the task.*

### Filter Bar
* Tracks how many active tasks remain.
* Gives the user the ability to filter between 'All', 'Active', and 'Completed'. 
* Allows a user to clear all the completed tasks from the body. 

## Component Hierarchy 

```javascript
<App/>
    <Header/>
        <CreateTask/>
    <Body/>
        <Task/>
    <Footer/>
```

If the body doesn't contain any tasks, do not render the Body or Footer components. 
* Need to figure out how to check to see if a parent component has any child components. 
