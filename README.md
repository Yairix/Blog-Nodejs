# Welcome to Blog-Nodejs 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

> the propouse of this API to be consumed by a Blog, exploring the areas of NODEjs and MySQL

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```
### Create field connection

`src/database/connection.js`

```js
const knex = require('knex')({
    
    client: 'mysql2',

    connection: {

        host:'your_localhost',
        user:'your_root',
        port: your_port,
        password:'your_password',
        database:'your_name_database'
    }
});  

module.exports = knex; 
```
### CREATE DATABASE

`Method get('/create')`

### CREATE TABLE AUTHORS

`Method get('/api/admin/createTable')`

### CRUD AUTHORS

- `Method post('/api/admin/authors') req.body {name, picture}`
- `Method get('/api/admin/authors')`
- `Method put('/api/admin/authors/:idAuthor') req.params: const {idAuthor},req.body:{name, picture}`
- `Method delete('/api/admin/authors/:idAuthor') req.params: const {idAuthor}`

### CREATE TABLE ARTICLES

`Method get('/api/admin/create/articles')`

### CRUD ARTICLES

- `Method get('/api/admin/articles')`
- `Method post('/api/admin/articles') req.body: {idAuthor, category, title, summary, firstParagraph, body}`
- `Method put('/api/admin/articles/:idArticle') req.params: {idArticle}, req.body: {idAuthor, category, title, summary, firstParagraph, body}`
- `Method delete('/api/admin/articles/:idArticle') req.params: {idArticle}`
- `Method get('/api/articles/category/:category') req.params { category }`

### CREATE TABLE USERS

`Method get('/api/create/users')`

### USERS 

`Method get('/api/admin/users')`

### SIGN-UP

`Method post('/api/sign-up') req.body: { username, email, password}`

### PASSWORD CHANGE

`Method put('/api/users/:username') req.params: {username}, req.body: { password}` 

### ARTICLES authenticated, with different responses for anonymous and logged users:

`Method get('/api/articles/:idArticle')`

## Author

👤 **Yairina Boada**

* Github: [@Yairix](https://github.com/Yairix)
* LinkedIn: [https://www.linkedin.com/in/yairina-boada-151198154/](https://www.linkedin.com/in/yairina-boada-151198154/)

## Show your support

Give a ⭐️ if this project helped you!


***
