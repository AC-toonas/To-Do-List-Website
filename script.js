// HTML elements connect
let todoinput = document.getElementById("todoInput")
let todolist = document.getElementById("todoList")

// Internal variables
let todos = []

//Functions
function renderTodos() {
    todolist.innerHTML = ""

    todos.forEach(function (todo, index) {
        let li = document.createElement("li")
        li.textContent = todo.text

        if (todo.done) {
            li.classList.add("done")
        }

        li.addEventListener("click", function () {
            todos[index].done = !todos[index].done
            saveTodos()
            renderTodos()
        })

        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = "❌"

        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation() 
            todos.splice(index, 1)
            saveTodos()
            renderTodos()
        })

        li.appendChild(deleteBtn)
        todolist.appendChild(li)
    })
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos))
}


// Code
let savedTodos = localStorage.getItem("todos")

if (savedTodos) {
    todos = JSON.parse(savedTodos)
    renderTodos()
}

todoinput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        let task = todoinput.value.trim()

        if (task !== "") {
            todos.push({
                text: task,
                done: false
            })

            todoinput.value = ""
            saveTodos()
            renderTodos()
        }
    }
})


