import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todos';

const app = express();

app.use('/todos', todoRoutes);

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        response.status(500).json({ message: error.message });
    }
);

app.listen(5000);
