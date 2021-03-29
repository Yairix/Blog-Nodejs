const express = require('express');
const passport = require('passport');
const router = express.Router();
const Authors = require('../controllers/authors');
const Articles = require('../controllers/articles');
const Users = require('../controllers/users');
const Login = require('../controllers/login');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const database = require('../database/connection');

router.use(cookieParser('My top secret'));

router.use(session({
    secret: 'My top secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 } // 10 minutes
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  database('users').where({id:id}).then(data => {
  done(null,{id:data[0].id, name:data[0]});
  })
});

// CREATE DATABASE
router.get('/create-database', Authors.createDatabase);

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

router.get('/', (req,res,next)=>{
  if(req.isAuthenticated()) return next();
  //is not logined => /login
  res.json({Status:'Username or password invalid'})
},(req,res)=>{
  //is logined
  res.send("<h1>Welcome to my Blog!</h1>")
});

router.post("/login", passport.authenticate('local',{
  //Receive credentials and logIn
  successRedirect: "/",
  failureRedirect: "/"
}));

router.get('/logout', function (req, res) {
  req.logout();
  res.json({Status:"Log Out"});
});
//PASSWORD CHANGE
router.put('/api/users/:username', Users.editUsers);

//ARTICLES authenticated, with different responses for anonymous and logged users:
router.get('/api/articles/:idArticle', passport.authenticate(['local', 'anonymous'], { session: false }), Login.displayArticles)

module.exports = router;