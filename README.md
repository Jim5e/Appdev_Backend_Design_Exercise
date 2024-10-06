# An exercise for Backend Design with Node.Js & Express
## Description:

This is application is meant to simulate a very simple program that allows you to register, login, and view profile details. The following middlewares were used: Rate Limiting, Authentication, and JOI.

This was tested using POSTMAN.

## Features
- **User Registration**
- **User Login**
- **User Profile**
- **Middleware**
  - **Logging** - Details each request.
  - **Rate Limiter** - ensures limited rate of API requests
  - **Authentication** (/UserProfile)
  - **All endpoints have validation from Joi to ensure that the incoming request data meets the required schema.**


## Installation:
The following dependencies are used: **bash, bcrypt, body-parser, dotenv, express, express-rate-limiter, joi, JWT, morgan, mysql, mysql2, nodemon, sequelize, sequelize cli**

### Installation of Dependencies (paste in Terminal)
```bash
npm install
```

## Environment 
Make sure to create a .env file in your root directory
```javascript
PORT=5000
JWT_SECRET=your_jwt_secret
```

## Run the App
```
npm run dev
```
or
```
npm start
```

## Important
1.) Please dont forget to attach Authorization Headers in POSTMAN, don't be like me.
```
- In the "Headers" tab, add:
  - Key: Authorization
  - Value: Bearer <your_jwt_token>
```

2.) Trying to login using the data in users.js will result in failure. This is because the passwords of the first three people are supposed to be hashed (in the array they are not). So to validate, you will have to create your own NEW user.
