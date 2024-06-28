import { todoData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const themeToggleBtn = document.querySelector('.theme-toggle-btn')
const todoListDiv = document.getElementById('todo-list')
const todoSubmit = document.getElementById('todo-submit')

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


// Submit new todo's
todoSubmit.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

  let newTodoEl = document.getElementById('todo-new-input')
  // when user submits form (via enter), do x action 
  const newTodo = {
    description: newTodoEl.value, 
    uuid: uuidv4(), 
    isChecked: false
  }

  todoData.unshift(newTodo)
  render()
  newTodoEl.value = ''
}



// Delete Todo's & Toggle marked/checked for todos 
todoListDiv.addEventListener('click', function(e) {
  if (e.target.dataset.todoItem) { /* if anywhere inside todo div is clicked, except del btn, do ... */ 
    toggleTodoChecked(e.target.dataset.todoItem) 
  } else if (e.target.dataset.todoDel) {  /* if delete btn is selected, do ... */ 
    deleteTodo(e.target.dataset.todoDel)
  }  
})

function toggleTodoChecked(todoItemId) {
  const targetTweetObj = todoData.filter(todo => todo.uuid === todoItemId)[0]

  targetTweetObj.isChecked = !targetTweetObj.isChecked
  render()
}

function deleteTodo(todoItemId) {
  const targetTweetObj = todoData.filter(todo => todo.uuid === todoItemId)[0] /* get target tweet obj */ 
  const index = todoData.indexOf(targetTweetObj)

  todoData.splice(index, 1)
  render()
}



// Dynamically Render Todo's
function getTodoItems() {
  let todoItems = ``

  if (todoData.length > 0) {
    todoData.forEach(todo => {
      let checkmarkClass = ''
      let checkedDescriptionClass = ''
    
      if (todo.isChecked) {
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
  const todoItemsDiv = document.getElementById('todo-items')

  todoItemsDiv.innerHTML = getTodoItems()
  console.log(todoData)
}

//render() // don't need to call this as it's already being called during toggle toggleTodoChecked()



/* Bugs
  css: the top banner doesn't extend the image to cover entire width. it repeats itself. 
  css: the design breaks once the list of todo's extends passed current screen. the bottom bg turns white, can't see the footer text. 

*/ 


/* Learning Notes 
Delete Todo's Function
  for my delete todo's function, currently I'm using array.splice. 
  I'm thinking is there a better more appropriate, non-destructive way I should be doing this instead. 
  for now I'll leave it tho. Might come back and edit this function in the future. 


*/ 