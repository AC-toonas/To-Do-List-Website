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
        li.classList.add("todo-" + todo.color)

        // text
        let textSpan = document.createElement("span")
        textSpan.textContent = todo.text
        li.appendChild(textSpan)

        // buttons
        let redBtn = document.createElement("button")
        redBtn.textContent = "🟥"

        let yellowBtn = document.createElement("button")
        yellowBtn.textContent = "🟨"

        let greenBtn = document.createElement("button")
        greenBtn.textContent = "🟩"

        let upBtn = document.createElement("button")
        upBtn.textContent = "⬆️"

        let downBtn = document.createElement("button")
        downBtn.textContent = "⬇️"

        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = "❌"

        // done state
        if (todo.done) {
            li.classList.add("done")
        }

        // toggle done
        li.addEventListener("click", function () {
            todos[index].done = !todos[index].done
            saveTodos()
            renderTodos()
        })

        // recolour
        redBtn.addEventListener("click", function (event) {
            event.stopPropagation()
            todos[index].color = "red"
            saveTodos()
            renderTodos()
        })

        yellowBtn.addEventListener("click", function (event) {
            event.stopPropagation()
            todos[index].color = "yellow"
            saveTodos()
            renderTodos()
        })

        greenBtn.addEventListener("click", function (event) {
            event.stopPropagation()
            todos[index].color = "green"
            saveTodos()
            renderTodos()
        })

        // move up
        upBtn.addEventListener("click", function (event) {
            event.stopPropagation()
            if (index > 0) {
                [todos[index], todos[index - 1]] = [todos[index - 1], todos[index]]
                saveTodos()
                renderTodos()
            }
        })

        // move down
        downBtn.addEventListener("click", function (event) {
            event.stopPropagation()
            if (index < todos.length - 1) {
                [todos[index], todos[index + 1]] = [todos[index + 1], todos[index]]
                saveTodos()
                renderTodos()
            }
        })

        // delete
        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation()
            todos.splice(index, 1)
            saveTodos()
            renderTodos()
        })

        // append
        li.appendChild(redBtn)
        li.appendChild(yellowBtn)
        li.appendChild(greenBtn)
        li.appendChild(upBtn)
        li.appendChild(downBtn)
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
            done: false,
            color: "default"
            })


            todoinput.value = ""
            saveTodos()
            renderTodos()
        }
    }
})


