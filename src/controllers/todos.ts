import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (request, response, next) => {
    const { text } = request.body as { text: string };
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    response
        .status(201)
        .json({ message: 'Created the todo!', createdTodo: newTodo });
};

export const getTodos: RequestHandler = (request, response, next) => {
    response.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (
    request,
    response,
    next
) => {
    const todoId = request.params.id;
    const { text: updatedText } = request.body as { text: string };

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error("Couldn't find todo! :(");
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

    response.json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] });
};

export const removeTodo: RequestHandler<{ id: string }> = (
    request,
    response,
    next
) => {
    const todoId = request.params.id;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error("Couldn't find todo! :(");
    }

    TODOS.splice(todoIndex, 1);

    response.status(204).json();
};
