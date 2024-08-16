import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import Task from '../../models/Tasks'; // Adjust the path to your Task model
import User from '../../models/Users';

const tasksRouter = Router();






// Apply passport JWT authentication middleware to all routes in the tasksRouter
tasksRouter.use(passport.authenticate('jwt', { session: false }));

//filter tasks based on status
tasksRouter.get("/tasks/:status", async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User; // Assuming user information is available in req.user
  const { status } = req.params; // Get the status from the route parameters
  try {
    // Convert status string to boolean
    const stat: boolean = status.toLowerCase() === 'true';
    const userID = user.id;
  
    // Query tasks based on userID and status
    const tasks = await Task.findAll({ 
      where: { 
        userID: userID, // Ensure this matches the column name in your Task model
        status: stat    // Filter by the converted boolean status
      }
    });
  
    if (tasks.length > 0) {
      res.json(tasks);
    } else {
      res.status(404).json({ message: 'No tasks found with the given status.' });
    }
  } catch (err) {
    next(err); 
  }
})

// Example of a secured route
tasksRouter.get('/tasks', async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;
  // Your logic to list tasks
  try {
    const userID = user.id; // Access the user ID from the authenticated user
    const tasks = await Task.findAll({ where: { userID } });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});



//get a single task
tasksRouter.get("/task/:id", async (req: Request, res: Response, next: NextFunction) =>{
  const user = req.user as User; // Assuming user information is available in the request body
  const { taskID } = req.params; // Get the status from the route parameters
  try {
    const userID = user.id; 
   
    const task = await Task.findOne({
      where: {
        userID: userID, // Match the userID first
        id: taskID // Then match the taskID (assuming 'id' is the primary key or task identifier)
      }
    });
    
    res.json(task); 
  } catch (err) {
    next(err); 
  }
})

//update a single task
tasksRouter.post("/task/update", async (req: Request, res: Response, next: NextFunction) =>{
  const user = req.user as User; // Assuming user information is available in the request body
  const { taskID, status } = req.body; // Get the taskID and status from the request body

  try {
    const userID = user.id; // Assuming 'user' is available on req.user
    
    // Update the task's status where the userID and taskID match
    const [updated] = await Task.update(
      { status }, // The field to update
      {
        where: {
          userID: userID, // Match the userID first
          id: taskID      // Then match the taskID (assuming 'id' is the primary key)
        }
      }
    );
  
    if (updated) {
      // If update was successful, send a response
      res.json({ message: 'Task status updated successfully.' });
    } else {
      // If no rows were affected, it means the task was not found
      res.status(404).json({ message: 'Task not found or not authorized.' });
    }
  } catch (err) {
    // Handle errors
    next(err); 
  }
})

tasksRouter.delete("/task/:id", async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User; 
  const taskID = req.params.id; 

  try {
      const userID = user.id;
      const task = await Task.findOne({
          where: {
              userID: userID, 
              id: taskID 
          }
      });

      if (task) {
          await Task.destroy({
              where: {
                userID: userID,
                id: taskID
              }
          });

          res.status(200).json({ message: "Task deleted successfully." });
      } else {
        res.status(404).json({ message: "Task not found." });
      }
  } catch (err) {
      console.error(err);
      next(err);
  }
});

tasksRouter.post("/task", async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, status } = req.body;
  const user = req.user as User;
  const userID = user.id;
 
  try {
    const newTask = await Task.create({
     name: name,
     description: description,
     status: status,
     userID: userID 
    })

    res.status(201).json({
      name: newTask.name,
      description: newTask.description,
      status: newTask.description,
      userID: newTask.userID
    });
  } catch (error) {
    next(error);
  }
})



export default tasksRouter;