import React from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./models/todo";
// import { Route } from "react-router-dom";

const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const delHandler = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="App">
      <NewTodo addTodoItem={setTodos} />
      <TodoList list={todos} deleteItem={delHandler} />
    </div>
  );
};

export default App;
