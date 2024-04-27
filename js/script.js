import { todoData } from './data.js'

const themeToggleBtn = document.querySelector('.theme-toggle-btn')
const todoItemsDiv = document.getElementById('todo-items')

// Toggle Theme 
themeToggleBtn.addEventListener('click', function() {
  document.body.classList.toggle('light-theme')
  
  if (document.body.classList.contains('light-theme')) {
    themeToggleBtn.src = './images/icon-moon.svg'
  } else {
    themeToggleBtn.src = './images/icon-sun.svg'
  }
})



// Get todo items from data, create html for it. 
function getTodoItems() {
  let todoItems = ``
  todoItems += `
  <div class="todo-item">
    <div class="circle todo-item-checkmark show-check"> <!-- class: 'show-check' --> 
      <img class="checkmark" src="./images/icon-check.svg">
    </div>
    <p class="todo-item-description checked">jog around the park 3x</p> <!-- class: 'checked' --> 
    <img class="todo-item-delete" src="./images/icon-cross.svg">
  </div>
  `
  todoData.forEach(todo => {
    todoItems += `
    <div class="todo-item">
      <div class="circle todo-item-checkmark">
        <img class="checkmark" src="./images/icon-check.svg">
      </div>
      <p class="todo-item-description">${todo.description}</p>
      <img class="todo-item-delete" src="./images/icon-cross.svg">
    </div>
    `
  })

  return todoItems
}

// Render todo items
function render() {
  todoItemsDiv.innerHTML = getTodoItems()
}

render()