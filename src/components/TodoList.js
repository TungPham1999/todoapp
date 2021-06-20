import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import "./TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const addTodo = (todo) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    const newTodos = [...todos, todo];

    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.title || /^\s*$/.test(newValue.title)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };
  const updateTodoAll = (data) => {
    const key = "id";
    const dataNew = todos.map((el) => {
      var found = data.find((s) => s[key] === el[key]);
      if (found) {
        el = Object.assign(el, found);
      }
      return el;
    });
    console.log(dataNew);
    setTodos(dataNew);
  };

  const searchTodo = (search) => {
    setFilteredTodos(
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(search.textSearch.toLowerCase())
      )
    );
  };
  const removeAllTodoChecked = () => {
    const removedArr = [...todos].filter((todo) => !todo.isChecked);
    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setTodos(items);
      setFilteredTodos(items);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <div className="todo-wrap">
      <TodoForm handleAction={addTodo} />
      <div className="slash" />
      <Todo
        todos={filteredTodos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        searchTodo={searchTodo}
        removeAllTodoChecked={removeAllTodoChecked}
        updateTodoAll={updateTodoAll}
      />
    </div>
  );
}

export default TodoList;
