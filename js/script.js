import { todoData } from './data.js'

console.log(todoData)
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

// Cross/Uncross Todo's (aka mark a todo as done via linethrough)




// Delete Todo's. 
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
  const checkbox = todoItem.querySelector('.circle')
  const todoItemDescription = todoItem.querySelector('.todo-item-description')

  checkbox.classList.toggle('show-check')
  todoItemDescription.classList.toggle('checked')
  console.log(checkbox)
  console.log(todoItemDescription)
  console.log("done")

}

function deleteTodo(todoItemId) {
  const targetTweetObj = todoData.filter(todo => todo.uuid === todoItemId)[0] /* get target tweet obj */ 
  console.log(todoData.indexOf(targetTweetObj))
  console.log(targetTweetObj)
  todoData.forEach(todo => console.log(todo === targetTweetObj))
}

// Dynamically Render Todo's
function getTodoItems() {
  let todoItems = ``

  /* this is dummy text for now to show what happens when I have a certain todos checked. */ 
  todoItems += `
  <div class="todo-item" id="todo-item" data-todo-item=${todoData[0].uuid}>
    <div class="circle todo-item-checkmark show-check"> <!-- class: 'show-check' --> 
      <img class="checkmark" src="./images/icon-check.svg">
    </div>
    <p class="todo-item-description checked">jog around the park 3x</p> <!-- class: 'checked' --> 
    <img class="todo-item-delete" id="todo-item-delete" src="./images/icon-cross.svg" data-todo-del=${todoData[0].uuid}>
  </div>
  `
  todoData.forEach(todo => {
    todoItems += `
    <div class="todo-item" id="todo-item" data-todo-item=${todo.uuid}>
      <div class="circle todo-item-checkmark">
        <img class="checkmark" src="./images/icon-check.svg">
      </div>
      <p class="todo-item-description">${todo.description}</p>
      <img class="todo-item-delete" id="todo-item-delete" src="./images/icon-cross.svg" data-todo-del=${todo.uuid}>
    </div>
    `
  })

  return todoItems
}

function render() {
  todoItemsDiv.innerHTML = getTodoItems()
}

render() // don't need to call this as it's already being called during toggle toggleTodoChecked()


// ?? 
/*
let todos = document.querySelectorAll('.todo-item')
console.log(todos)
todos.forEach(todo => {
  todo.addEventListener('click', function(e) {
    
  })
})
*/ 

// currently working on adding toggleCheckedTodo functionality 