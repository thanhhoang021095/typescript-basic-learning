import express, { Request, Response, NextFunction } from 'express'
import { json } from "body-parser";
import todoRoutes from './routes/todos';

const app = express();
const PORT = 3001;

app.use(json());

app.use('/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`app is running at port ${PORT}`);
    
}); 