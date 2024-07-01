import { todoData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const themeToggleBtn = document.querySelector('.theme-toggle-btn')
const todoListDiv = document.getElementById('todo-list')
const todoSubmit = document.getElementById('todo-submit')

let active = false
let completed = false


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


// get todo items count 
function getTodoCount() {
  const todoCount = document.querySelector('.todo-count')
  let todoItems = document.querySelectorAll('.todo-item')

  todoCount.innerText = todoData.length
}


// Filter list of todos 
const todoInfo = document.querySelector('.todo-info')
const todoFilterList = document.querySelector('.todo-filter-list')
const todoFilterBtns = document.querySelectorAll('.todo-filter-btn')
const filterAll = document.querySelector('.todo-filter-all')
const filterActive = document.querySelector('.todo-filter-active')
const filterCompleted = document.querySelector('.todo-filter-completed')


todoFilterList.addEventListener('click', function(e) {
  todoFilterBtns.forEach(filter => {
    //console.log(filter)
    filter.classList.remove('active')
    e.target.classList.add('active')
  })

  if (e.target === filterActive) {
    active = true
    completed = false
  } else if (e.target === filterCompleted) {
    active = false
    completed = true
  } else if (e.target === filterAll) {
    active = false;
    completed = false
  }
  console.log("active: " + active)
  //console.log("completed: " + completed)
  render()
})


// clear completed todos btn 
const clearTodosBtn = document.querySelector('.todo-clear-completed')

clearTodosBtn.addEventListener('click', clearTodos)

function clearTodos() {
  // todoData = todoData.filter(todo => !todo.isChecked)
  // todoData.forEach((todo) => {
  //   let index = todoData.indexOf(todo)
  //   if (todo.isChecked) {
  //     console.log(index)
  //     todoData.splice(todoData.indexOf(index, 1))
  //   }
  // })
  for (let i = todoData.length - 1; i >= 0; i--) {
    let index = todoData.indexOf(todoData[i])
      if (todoData[i].isChecked) {
        todoData.splice(i, 1)
      }
  }
  console.log(todoData)
  render()

}


// Dynamically Render Todo's
function getTodoItems() {
  let todoItems = ``

  if (todoData.length > 0) {
    // if active = true, todoData = todoData.filter(todo => !todo.isChecked)
    // if completed = true, todoData = todoData.filter(todo => todo.ischecked)
    let newTodoData = todoData
    if (active) {
      newTodoData = todoData.filter(todo => !todo.isChecked)
    } else if (completed) {
      newTodoData = todoData.filter(todo => todo.isChecked)
    }

    newTodoData.forEach(todo => {
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
  getTodoCount()
}


/* To do 
  save new todos to database or local storage or the data.js file. 

  i've done the filter list, but I'm unsure if my way is ideal way or not. 
    - also idk if it will be compatible w/ saving new todos to database/data.js file. 

  
*/ 

/* Bugs
  css: the top banner doesn't extend the image to cover entire width. it repeats itself. 
  css: the design breaks once the list of todo's extends passed current screen. the bottom bg turns white, can't see the footer text. 

*/ 


/* Learning Notes 
Delete Todo's Function
  for my delete todo's function, currently I'm using array.splice. 
  I'm thinking is there a better more appropriate, non-destructive way I should be doing this instead. 
  for now I'll leave it tho. Might come back and edit this function in the future. 

Reassigning variables 
  in the data.js file, even tho i've declared it as let, once it's imported, I cannot reassign the todoData array, even though it's a let, because it's imported. The only change I can make is inside the data.js file itself. Or I can use array.splice() which is what i've done to get it to work, although this doesn't seem like the ideal solution imo. 
*/ 