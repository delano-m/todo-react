import { useState } from "react"
import { NewTodoForm } from "./NewTodoForm.jsx"
import { TodoList } from "./TodoList.jsx"
import { useEffect } from "react"
import "./styles.css"

export default function App() {
  // first, second is update state
  // STATE
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  // Patterns that I'm noticing
  // if we want to change something, we
  // add an event into the element and anything inside
  // curly braces is the function that will be ran

  useEffect(()=> {
    localStorage.setItem("ITEM", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(
      currentTodos => {
      return [
        // ...currentTodos will extend off the given array
        ...currentTodos, {
          // make new todo
          id: crypto.randomUUID(),
          title: title,
          completed: false
        },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          // return an NEW UPDATED OBJECT, old todo is destroyed
          return { ...todo, completed}
        }

        // else return the old one
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      // filter out current todos MINUS the one that matches the id
      return currentTodos.filter(todo => todo.id !== id)
    })
  }


  return (
    // Fragment = essentially an empty tag
  <>  
    <NewTodoForm onSubmit={addTodo}/>
    <h1 className="header">Todo List</h1>
    <TodoList todos={todos} 
              toggleTodo={toggleTodo} 
              deleteTodo={deleteTodo} />
  </>
)}