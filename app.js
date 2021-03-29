const express = require('express');
const passport = require('passport');
const PassportLocal = require('passport-local').Strategy;
const database = require('./src/database/connection');
const AnonymousStrategy = require('passport-anonymous').Strategy;
const router = require('./src/routes/routes');
const app = express();

app.use(express.json())
app.use(router)
app.use(express.urlencoded({ extended: true}));

passport.use(new AnonymousStrategy());

passport.use(new PassportLocal({ usernameField: 'username', passwordField: 'password'},function(username, password, done){
    
    database('users').where({username:username}).then(data => {
        if(data.length > 0){
            if(username === data[0].username && password === data[0].password){
                return done(null,{id:data[0].id, name:data[0].username});
            }else {
                return done(null, false, { message: 'Username or password invalid' });
            }
        }else {
            return done(null, false, { message: 'Username or password invalid' });
        }
    }).catch(error=>{
        console.log(error)
    }) 

}));

app.listen(4000, () =>{
    console.log("Application rolling on port 4000!")
});