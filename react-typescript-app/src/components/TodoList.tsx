import React from "react";
import { Todo } from "../models/todo";
import './TodoList.css';

interface TodoListProps {
  list: Todo[];
  deleteItem: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ list = [], deleteItem }) => {
  return (
    <ul>
      {list.map((t) => (
        <li key={t.id}>
          <span>{t.text}</span>
          <button onClick={deleteItem.bind(null, t.id)}>DELETE</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
