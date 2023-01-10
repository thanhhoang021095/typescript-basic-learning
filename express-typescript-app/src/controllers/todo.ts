import { RequestHandler } from "express"
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as { text: string }).text;
    const newTodo: Todo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    res.status(201).json({ message: 'Create todo success', result: newTodo });
};

export const getTodoList: RequestHandler = (req, res, next) => {
    res.status(200).json({ message: 'Get todo list success', result: TODOS });
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = (req.body as { text: string }).text;

    const todoIdx = TODOS.findIndex((t:Todo) => todoId === t.id);
    if (todoIdx < 0) {
        throw new Error("Could not find todo item!")
    }
    TODOS[todoIdx] = new Todo(TODOS[todoIdx].id, updatedText);

    res.status(200).json({ message: 'Update item success', result: TODOS[todoIdx] });
}

export const deleteTodo: RequestHandler = (req, res, next) => {
    const todoId = req.params.id;

    const todoIdx = TODOS.findIndex((t:Todo) => todoId === t.id);
    if (todoIdx < 0) {
        throw new Error("Could not find todo item!")
    }

    TODOS.splice(todoIdx, 1);

    res.status(200).json({ message: 'Delete', result: TODOS });
}