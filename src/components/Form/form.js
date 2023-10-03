import React from "react";

const Form = ({setInputText,todos,setTodos,inputText,setStatus, searchText, setSearchText}) => {
    const inputTextHandler = (e) => {
        console.log(e.target.value);
        setInputText(e.target.value);
    };
    const submitTodoHandler = (e) => {
        e.preventDefault();
        if(inputText.trim() !== "") {
            console.log(todos)
            setTodos((prev) => ([
                ...prev, {text: inputText , completed : false , id :Math.random()*1000},
            ]));
            setInputText("");
        }
    };
    const statusHandler = (e) => {
     setStatus(e.target.value);
    }
    return(
        <form>
            <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
            <button onClick={submitTodoHandler} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
            <div className="search-container">
                <input className={'search-input'}
                       type="text"
                       placeholder="Search todos"
                       value={searchText}
                       onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <div className="select">
                <select onChange={statusHandler} name="todos" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>

        </form>
    );
}
export  default Form;