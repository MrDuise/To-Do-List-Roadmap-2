# To-Do Application Backend

This is a backend project for a To-Do application. The project is built using **Express.js** and **TypeScript**, with authentication implemented using **JWT (JSON Web Token)**. It leverages a **MySQL** database for storing user credentials and task data. While I have more experience then this, I am doing this project as a refresh of my skills while working to harder projects. This project is number 2 in the following list https://roadmap.sh/backend/project-ideas


## Project Overview

This project expands upon the basic CRUD operations typically found in a To-Do application by incorporating authentication logic. The backend allows users to register and log in, manage their tasks, and filter tasks based on their status. Each task is associated with a user, ensuring that only authenticated users can manage their own tasks. 

## Features

- **User Authentication:** 
  - Register new users with username and password.
  - Authenticate users using JWT.
  
- **Task Management:** 
  - Create new tasks associated with the authenticated user.
  - Update the status of tasks.
  - Delete tasks.
  - Retrieve a list of tasks, with the ability to filter them by status.
  - View detailed information for each task.

## Technologies Used

- **Express.js:** For handling HTTP requests and building RESTful APIs.
- **TypeScript:** For type safety and enhanced code quality.
- **JWT:** For secure authentication and authorization.
- **MySQL:** For relational data storage and management.


