"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodoList = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'Create todo success', result: newTodo });
};
exports.createTodo = createTodo;
const getTodoList = (req, res, next) => {
    res.status(200).json({ message: 'Get todo list success', result: TODOS });
};
exports.getTodoList = getTodoList;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIdx = TODOS.findIndex((t) => todoId === t.id);
    if (todoIdx < 0) {
        throw new Error("Could not find todo item!");
    }
    TODOS[todoIdx] = new todo_1.Todo(TODOS[todoIdx].id, updatedText);
    res.status(200).json({ message: 'Update item success', result: TODOS[todoIdx] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIdx = TODOS.findIndex((t) => todoId === t.id);
    if (todoIdx < 0) {
        throw new Error("Could not find todo item!");
    }
    TODOS.splice(todoIdx, 1);
    res.status(200).json({ message: 'Delete', result: TODOS });
};
exports.deleteTodo = deleteTodo;
