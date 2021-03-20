//const connection = require('../database/connection');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const Authors = require('../controllers/authors');
const Articles = require('../controllers/articles');
const Users = require('../controllers/users');
const Login = require('../controllers/login');
const database = require('../database/connection');
const cookieParser = require('cookie-parser');
const session = require('express-session');


router.use(cookieParser('My top secret'));

router.use(session({
    secret: 'My top secret',
    resave: true,
    saveUninitialized: true
   // cookie: { maxAge: 20000 }
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
   // User.findById(id, function(err, user) {
    done(null, {id:1, name:"Hada"} )
  //  });
});

// CREATE DATABASE
router.get('/create', Authors.createDatabase);

//CREATE TABLE AUTHORS
router.get('/api/admin/createTable', Authors.createTable);

//CRUD AUTHORS
router.post('/api/admin/authors', Authors.createAuthors);
router.get('/api/admin/authors', Authors.readAuthors);
router.put('/api/admin/authors/:idAuthor', Authors.editAuthors);
router.delete('/api/admin/authors/:idAuthor', Authors.deleteAuthors);

//CREATE TABLE ARTICLES
router.get('/api/admin/create/articles', Articles.createTable);

//CRUD ARTICLES
router.get('/api/admin/articles', Articles.readArticles);
router.post('/api/admin/articles', Articles.createArticles);
router.put('/api/admin/articles/:idArticle', Articles.editArticles);
router.delete('/api/admin/articles/:idArticle', Articles.deleteArticles);
router.get('/api/articles/category/:category', Articles.readArticlesCategory);

//CREATE TABLE USERS
router.get('/api/create/users', Users.createTableUsers);

//USERS 
router.get('/api/admin/users', Users.readUsers);

//SIGN-UP
router.post('/api/sign-up', Users.signUp);

//PASSWORD CHANGE
router.put('/api/users/:username', Users.editUsers);

//ARTICLES authenticated, with different responses for anonymous and logged users:
router.get('/api/articles/:idArticle', passport.authenticate(['local', 'anonymous'], { session: false }), Login.displayArticles)

module.exports = router;