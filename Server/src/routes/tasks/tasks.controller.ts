import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import Task from '../../models/Tasks'; // Adjust the path to your Task model

const tasksRouter = Router();






// Apply passport JWT authentication middleware to all routes in the tasksRouter
tasksRouter.use(passport.authenticate('jwt', { session: false }));

// Example of a secured route
tasksRouter.get('/tasks', async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
  // Your logic to list tasks
  try {
    const userID = user.id; // Access the user ID from the authenticated user
    const tasks = await Task.findAll({ where: { userID } });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

//filter tasks based on status
tasksRouter.get("/tasks/:status", (req: Request, res: Response, next: NextFunction) => {

})

//get a single task
tasksRouter.get("/task/:id", (req: Request, res: Response, next: NextFunction) =>{

})

tasksRouter.delete("/task/:id", (req: Request, res: Response, next: NextFunction) => {

})

tasksRouter.post("/task", (req: Request, res: Response, next: NextFunction) => {

})



export default tasksRouter;