import React, { useEffect, useRef, useState } from "react";
import TodoForm from "./TodoForm";
import "./Todo.css";

const Todo = ({
  todos,
  removeTodo,
  updateTodo,
  searchTodo,
  removeAllTodoChecked,
  updateTodoAll,
}) => {
  const [search, setSearch] = useState([""]);
  const [fakeTodos, setFakeTodos] = useState([]);
  const typingTimeoutRef = useRef(null);
  const submitUpdate = (todo) => {
    updateTodo(todo.id, todo);
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setFakeTodos(items);
    }
  }, []);
  const updateTodoFake = (todo) => {
    const index = fakeTodos.findIndex((r) => r.id === todo.id);
    if (index !== -1) {
      fakeTodos[index] = todo;
      setFakeTodos(fakeTodos);
    } else {
      setFakeTodos([...fakeTodos, todo]);
    }
  };
  const handleChangeInputSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      searchTodo({
        textSearch: value,
      });
    }, 300);
  };
  const showDetail = (todo) => {
    updateTodo(todo.id, {
      ...todo,
      isUpdate: todo.isUpdate ? !todo.isUpdate : true,
    });
  };
  const updateCheckbox = (todo) => {
    updateTodo(todo.id, {
      ...todo,
      isChecked: todo.isChecked ? !todo.isChecked : true,
    });
  };
  const removeAll = () => {
    removeAllTodoChecked();
  };
  const doneAll = () => {
    const dataNew = fakeTodos
      .filter((r) => r.isChecked)
      .map((r) => {
        return {
          ...r,
          isChecked: false,
        };
      });
    updateTodoAll(dataNew);
  };
  const listItems = todos.length ? (
    todos.map((todo, index) => (
      <>
        <div className="todo-row" key={index}>
          <div className="todo-checkbox">
            <input
              type="checkbox"
              name="isCheck"
              key={index}
              checked={todo.isChecked}
              onChange={() => updateCheckbox(todo)}
            />
          </div>
          <div className="todo-name" key={todo.id}>
            {todo.title}
          </div>
          <div className="todo-buttons">
            <button
              className="button-action action-detail"
              onClick={() => showDetail(todo)}
            >
              Detail
            </button>
            <button
              className="button-action action-remove"
              onClick={() => removeTodo(todo.id)}
            >
              Remove
            </button>
          </div>
        </div>
        {todo.isUpdate && (
          <TodoForm
            editItem={todo}
            handleAction={submitUpdate}
            updateTodoByKeyUp={updateTodoFake}
          />
        )}
      </>
    ))
  ) : (
    <div>No results found {search}</div>
  );
  return (
    <div className="todo-list">
      <h1>To do List</h1>
      <div>
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          name="search"
          className="input-seach"
          onChange={handleChangeInputSearch}
        ></input>
      </div>
      <div className="content-main">{listItems}</div>
      {todos.some((r) => r.isChecked) && (
        <div className="bulk-action">
          <div className="bulk-action-name">Bulk action</div>
          <div className="bulk-action-button">
            <button className="bulk-action-done" onClick={() => doneAll()}>
              Done
            </button>
            <button className="bulk-action-remove" onClick={() => removeAll()}>
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
