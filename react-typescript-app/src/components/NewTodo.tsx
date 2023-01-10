import React, { useRef } from "react";
import './NewTodo.css';

interface NewTodoProps {
  addTodoItem: (cb: any) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ addTodoItem }) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredText = textInputRef.current!.value;
    if (enteredText.length) {
      addTodoItem((prev: any) => [
        ...prev,
        { id: Math.random().toString(), text: enteredText },
      ]);
    }
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo Text</label>
        <input ref={textInputRef} type="text" id="todo-text" />
        <button type="submit">ADD TODO</button>
      </div>
    </form>
  );
};

export default NewTodo;
