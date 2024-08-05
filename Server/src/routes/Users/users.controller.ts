import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../../models/Users'; // Adjust the path to your User model
import dotenv from 'dotenv';

dotenv.config();

const usersRouter = Router();



usersRouter.post('/authenticate', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }
  
      const payload = {
        id: user.id,
        name: user.name,
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      res.json({ success: true, token: 'Bearer ' + token });
    } catch (err) {
      next(err);
    }
  });

  usersRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if the user already exists
    //   const existingUser = await User.findOne({ where: { email } });
    //   if (existingUser) {
    //     return res.status(400).json({ message: 'User already exists' });
    //   }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create the user
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
  
      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  });


export default usersRouter;

