import { todoData } from './data.js'

const themeToggleBtn = document.querySelector('.theme-toggle-btn')
const todoItemsDiv = document.getElementById('todo-items')
const todoListDiv = document.getElementById('todo-list')

// Toggle Theme 
themeToggleBtn.addEventListener('click', function() {
  document.body.classList.toggle('light-theme')
  
  if (document.body.classList.contains('light-theme')) {
    themeToggleBtn.src = './images/icon-moon.svg'
  } else {
    themeToggleBtn.src = './images/icon-sun.svg'
  }
})

render() /* need to call render first so the html of the todo's loads. */

 

// Delete Todo's & Toggle marked/checked for todos 
todoListDiv.addEventListener('click', function(e) {
  if (e.target.dataset.todoItem) { /* if anywhere inside todo div is clicked, except del btn, do ... */ 
    // mark the checked todo. 
    toggleTodoChecked(e.target)
  } else if (e.target.dataset.todoDel) {  /* if delete btn is selected, do ... */ 
    // delete todo 
    deleteTodo(e.target.dataset.todoDel)
  }  
})

function toggleTodoChecked(todoItem) {
  const targetTweetObj = todoData.filter(todo => todo.uuid === todoItem.dataset.todoItem)[0]

  targetTweetObj.checked = !targetTweetObj.checked
  render()
}

function deleteTodo(todoItemId) {
  const targetTweetObj = todoData.filter(todo => todo.uuid === todoItemId)[0] /* get target tweet obj */ 
  const index = todoData.indexOf(targetTweetObj)
  //todoData.forEach(todo => console.log(todo === targetTweetObj))
  todoData.splice(index, 1)
  render()
  console.log(todoData)
}

// Dynamically Render Todo's
function getTodoItems() {
  let todoItems = ``

  /* this is dummy text for now to show what happens when I have a certain todos checked. */ 
  if (todoData.length > 0) {
    todoData.forEach(todo => {
      let checkmarkClass = ''
      let checkedDescriptionClass = ''
    
      if (todo.checked) {
        checkmarkClass = 'show-check'
        checkedDescriptionClass = 'checked'
      }     

      todoItems += `
      <div class="todo-item" id="todo-item" data-todo-item=${todo.uuid}>
        <div class="circle todo-item-checkmark ${checkmarkClass}">
          <img class="checkmark" src="./images/icon-check.svg">
        </div>
        <p class="todo-item-description ${checkedDescriptionClass}">${todo.description}</p>
        <img class="todo-item-delete" id="todo-item-delete" src="./images/icon-cross.svg" data-todo-del=${todo.uuid}>
      </div>
      `
    })
  
  }

  return todoItems
}

function render() {
  todoItemsDiv.innerHTML = getTodoItems()
}

render() // don't need to call this as it's already being called during toggle toggleTodoChecked()



// currently working on adding toggleCheckedTodo functionality 

/* Learning Notes 
Delete Todo's Function
  for my delete todo's function, currently I'm using array.splice. 
  I'm thinking is there a better more appropriate, non-destructive way I should be doing this instead. 
  for now I'll leave it tho. Might come back and edit this function in the future. 



*/ 