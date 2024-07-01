# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Links

- Live Site URL: [https://jordansgit.github.io/todo-app/](https://jordansgit.github.io/todo-app/)

### Screenshot

![](./screenshot.jpg)

## My process

### Built with

- HTML
- CSS, SCSS 
- JavaScript

### What I learned

Delete Todo's Function
For my delete todo's function, currently I'm using array.splice. 
I'm thinking is there a better more appropriate, non-destructive way I should be doing this instead. 
For now I'll leave it tho. Might come back and edit this function in the future. 

Reassigning variables 
In the data.js file, even tho i've declared it as let, once it's imported, I cannot reassign the todoData array, even though it's a let, because it's imported. The only change I can make is inside the data.js file itself. Or I can use array.splice() which is what i've done to get it to work, although this doesn't seem like the ideal solution imo. 
