import express from 'express';
import passport from 'passport';
import './config/passportConfig'; // Adjust the path to your passport config
import usersRouter from '../src/routes/Users/users.controller';
import tasksRouter from '../src/routes/tasks/tasks.controller';
import sequelize from './config/db';
import User from '../src/models/Users';
import Task from '../src/models/Tasks';

const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/users', usersRouter);
app.use('/api', tasksRouter);

// Create associations
User.associate();
Task.associate();

// Sync database
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});