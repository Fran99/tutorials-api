# Tutorials REST API
REST API that enables authenticated users to create, update, list and delete tutorials.

### Stack
- Node.js
- Express.js
- Sequelize
- MySQL

### Main Dependencies 
- helmet [^1]
- joi
- jsonwebtoken
- mysql2
- sequelize
- morgan
- bcrypt
- eslint (dev)
- nodemon (dev)

### Endpoints:

###### Authentication
```
- POST      /v1/auth/signup - Creates a new user
- POST      /v1/auth - Authenticates a user given email and password
- GET       /v1/me - Shows data about the authenticated user
```
###### Tutorials
```
- POST      /v1/tutorials - Creates a tutorial
- GET       /v1/tutorials - List all the tutorials
- GET       /v1/tutorials/:id - Show a specific tutorial
- PUT       /v1/tutorials/:id - Updates a tutorial
- DELETE    /v1/tutorials/:id - Deletes a tutorial
- DELETE    /v1/tutorials/mass_delete - Deletes all tutorials
```
### Links:
- [VIDEO - CRUD Operations in Postman](https://www.youtube.com/watch?v=SrKxb5bmM-A)
- [VIDEO - Test Runner in Postman](https://www.youtube.com/watch?v=z0-P6lOZFeQ)
- [Tutorials API Documentation](https://documenter.getpostman.com/view/5451117/2s93CExGdf)


[^1]: My reference.

