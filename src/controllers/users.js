const database = require('../database/connection');

class Users {

    createTableUsers(req, res){
        database.schema.raw('USE Blog;').raw('CREATE TABLE IF NOT EXISTS users( id INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, username VARCHAR(65) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE, password VARCHAR(65) NOT NULL);').then(data =>{
            res.json({message: "Table created with success!"})
        }).catch(error =>{
            res.json(error)
        })
    };

    signUp(req, res){ 
        const { username, email, password} = req.body
    
        database.insert({ username, email, password}).table("users").then(data =>{
            console.log(data[0])
            res.json({message:"User successfully registered in the Database!", "Data user":req.body})
        }).catch(error=>{
            console.log(error)
        }) 
    };

    readUsers(req, res){
        database.select("*").from('users').then(data =>{
            res.json({"list of registered users":data})
        }).catch(error =>{
            res.json(error)})
    };

    editUsers(req, res){
        const {username} = req.params
        const { password} = req.body

        database('users').where({username:username}).update({password:password}).then(data =>{
            res.json({message:"Password updated successfully.!"})
        }).catch(error =>{
            res.json(error)})
    };
}

module.exports = new Users();