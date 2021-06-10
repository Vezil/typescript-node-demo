import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export class TodoController {
    createTodo: RequestHandler = (request, response, next) => {
        const text = request.body.text;
        const newTodo = new Todo(Math.random().toString(), text);
    };
}
