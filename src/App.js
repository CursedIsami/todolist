import React, { useState, useEffect, useLayoutEffect } from 'react';
import './App.css';
// Importing components
import Form from "./components/Form/form";
import TodoList from "./components/TodoList/todoList";

function App() {

    // State
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState('all');
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [searchText, setSearchText] = useState("");

    // Use effect
    useLayoutEffect(() => {
        getLocalTodos();
    }, []);

    useEffect(() => {
        saveLocalTodo()
        filterHandler();
    }, [todos, status, searchText]);

    // Functions
    const filterHandler = () => {
        switch (status) {
            case 'completed':
                setFilteredTodos(
                    todos.filter((todo) => todo.completed === true && todo.text.includes(searchText))
                );
                break;
            case 'uncompleted':
                setFilteredTodos(
                    todos.filter((todo) => todo.completed === false && todo.text.includes(searchText))
                );
                break;
            default:
                setFilteredTodos(todos.filter((todo) => todo.text.includes(searchText)));
                break;
        }
    };

    // Save data to local storage
    const saveLocalTodo = () => {
        const localTodos = JSON.parse(localStorage.getItem('todos'))
        if (localTodos) {
            const array = [...todos]
            localStorage.clear()
            return localStorage.setItem("todos", JSON.stringify(array))
        }
        return
    };

    const getLocalTodos = () => {
        const todoLocal = localStorage.getItem("todos");
        if (!todoLocal) {
            setTodos([]);
            return localStorage.setItem("todos", JSON.stringify([]))
        }
        setTodos(JSON.parse(todoLocal));
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Maxim Todo List</h1>
            </header>
            <Form
                inputText={inputText}
                todos={todos}
                setTodos={setTodos}
                setInputText={setInputText}
                setStatus={setStatus}
                searchText={searchText}
                setSearchText={setSearchText}
            />
            <div style={{ display: "flex", width: "77%", justifyContent: "space-between", alignItems: "center", margin: "0 auto" }}>
                <p>All todos: {todos.length}</p>
                <p>Completed todos: {todos.filter((todo) => todo.completed === true).length}</p>
            </div>
            <TodoList
                setTodos={setTodos}
                todos={todos}
                filteredTodos={filteredTodos}

            />
        </div>
    );
}

export default App;
