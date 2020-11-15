// selecteurs
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// ecouteurs
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);

// functions

// function ajout todo

function addTodo(event){
    // création de la todo div 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    // création de la li
    const todoLi = document.createElement("li");
    todoLi.innerText = todoInput.value;
    todoLi.classList.add("todo-item");
    todoDiv.appendChild(todoLi);
    
    // création button check
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);
    
    // création button supprimer
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    // ajout de la todo-div à la todo-list
    todoList.appendChild(todoDiv);
    
    todoInput.value = "";
    event.preventDefault();
}

// function suppression todo

function deleteCheck(e){
   const item = e.target;
   // delete todo
   if(item.classList[0] === "trash-btn"){
       item.parentElement.classList.add("fall");
       item.parentElement.addEventListener("transitionend", function(){
        item.parentElement.remove();
       });
   }
   
   // check mark
   if(item.classList[0] === "complete-btn"){
       item.parentElement.classList.toggle("completed");
   }
}

// function filter todo

function filterTodo(e){
    // const todos = todoList.childNodes;
    const todos = todoList.children;
    
    Object.keys(todos).forEach(function(element){
        let todo = todos[element]
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } 
                else{
                    todo.style.display = "none";
                }
                break;
            
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } 
                else{
                    todo.style.display = "none";
                }
                break;       
        }
    });
}