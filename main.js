// selecteurs
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// ecouteurs
document.addEventListener("DOMContentLoaded", getTodos);
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
    
    // ajout de la valeur de la todoInput au localStorage
    saveLocalTodos(todoInput.value);
    
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
       removeLocalTodos(item.parentElement);
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
        };
    });
}

// function sauvegarde dans le localStorage

function saveLocalTodos(todo){
    //checker si il y a des items existants
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// function affichage des todos sauvegardées dans le localStorage

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    };
   
    todos.forEach(function(todo){
        // création de la todo div 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    // création de la li
    const todoLi = document.createElement("li");
    todoLi.innerText = todo;
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
    });
    
}

// function suppression des todos du localStorage

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === ""){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}