# Tutorials REST API
REST API that enables authenticated users to create, update, list and delete tutorials.

### How to run it?
###### The most efficient way is trough docker composer
```
git clone https://github.com/Fran99/tutorials-api.git tutorials
```

```
cd tutorials
```

```
docker-compose up
```

###### The API is set to run on http://localhost:3000

### Stack
- Node.js
- Express.js
- Sequelize
- MySQL

### Main Dependencies 
- Helmet [^1]
- joi [^2]
- jsonwebtoken [^3]
- mysql2 [^4]
- sequelize [^5]
- morgan [^6]
- bcryptjs [^7]
- eslint (dev) [^8]
- nodemon (dev) [^9]

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
- [Postman collection](api/collection-tutorials-rest-api.json)


[^1]: Helmet helps you secure your Express apps by setting various HTTP headers.
[^2]: Validator for input data.
[^3]: JWT implementation.
[^4]: MySQL driver.
[^5]: ORM to be used with MySQL.
[^6]: HTTP request logger middleware.
[^7]: Bcrypt package used to hash/verify passwords
[^8]: A tool for identifying and reporting on patterns found in JavaScript code.
[^9]: A tool that helps develop applications by automatically restarting the node application when file changes in the directory are detected.