
# NestJS Todo Application

This is a simple Todo application built with NestJS, Prisma, and MongoDB. The application includes authentication using JWT and allows users to create, read, update, and delete todo items.

## Demo

- <https://todo-app-api-ochre.vercel.app>

## Prerequisites

- Node.js (v18 or later)
- Docker (if you want to use Docker for running the application)
- MongoDB (you can use MongoDB Atlas or a local MongoDB instance)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Aekawan/todo-app-api.git
   cd todo-app-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```dotenv
   DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"
   JWT_SECRET="your_secret_key"
   ```

4. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

5. Run the application:

   ```bash
   npm run start
   ```

   The application should now be running at `http://localhost:4000`.

## Running with Docker

1. Build the Docker image:

   ```bash
   docker build -t my-nestjs-app .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 4000:4000 --env-file .env my-nestjs-app
   ```

3. Alternatively, you can use Docker Compose:

   ```yaml
   version: '3.8'

   services:
     app:
       build: .
       ports:
         - 4000:4000'
       environment:
         - DATABASE_URL=${DATABASE_URL}
         - JWT_SECRET=${JWT_SECRET}
       depends_on:
         - db

     db:
       image: mongo:5
       ports:
         - '27017:27017'
       environment:
         MONGO_INITDB_ROOT_USERNAME: root
         MONGO_INITDB_ROOT_PASSWORD: example
       volumes:
         - mongo-data:/data/db

   volumes:
     mongo-data:
   ```

   ```bash
   docker-compose up --build
   ```

## API Endpoints

### Authentication

- **Login**

  ```http
  POST /auth/login
  ```

  **Request Body:**

  ```json
  {
    "username": "your-email@example.com",
    "password": "your-password"
  }
  ```

  **Response:**

  ```json
  {
    "userId": "user-id",
    "access_token": "jwt-token"
  }
  ```

### Todos

- **Get all todos**

  ```http
  GET /todos
  ```

  **Headers:**

  ```http
  Authorization: Bearer <jwt-token>
  ```

- **Get a todo by ID**

  ```http
  GET /todos/:id
  ```

  **Headers:**

  ```http
  Authorization: Bearer <jwt-token>
  ```

- **Create a todo**

  ```http
  POST /todos
  ```

  **Headers:**

  ```http
  Authorization: Bearer <jwt-token>
  ```

  **Request Body:**

  ```json
  {
    "title": "New Todo",
    "description": "Description of new todo",
    "date": "2024-07-10",
    "time": "12:00",
    "icon": "shopping"
  }
  ```

- **Update a todo**

  ```http
  PUT /todos/:id
  ```

  **Headers:**

  ```http
  Authorization: Bearer <jwt-token>
  ```

  **Request Body:**

  ```json
  {
    "title": "Updated Todo",
    "description": "Updated description",
    "date": "2024-07-11",
    "time": "14:00",
    "icon": "shopping"
  }
  ```

- **Delete a todo**

  ```http
  DELETE /todos/:id
  ```

  **Headers:**

  ```http
  Authorization: Bearer <jwt-token>
  ```

## Additional Notes

- Ensure that your MongoDB instance is running and accessible.
- Replace placeholders in the `.env` file with your actual MongoDB credentials and other necessary values.
