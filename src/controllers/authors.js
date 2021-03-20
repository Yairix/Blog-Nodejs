const database = require('../database/connection')

class Authors{

    createDatabase(req, res){
        database.schema.raw('CREATE DATABASE IF NOT EXISTS jungleDevs;').then(data =>{
            res.json({message: "Database created with success!"})
        }).catch(error =>{
            res.json(error)
        })
    };

    createTable(req, res){
        database.schema.raw('USE jungleDevs;').raw('CREATE TABLE IF NOT EXISTS authors(idAuthor INT AUTO_INCREMENT NOT NULL PRIMARY KEY, name VARCHAR(65), picture VARCHAR(255));').then(data =>{
            res.json({message: "Table created with success!"})
        }).catch(error =>{
            res.json(error)
        })
    };

    createAuthors(req, res){ 
        const {name, picture} = req.body
        console.log(name, picture)
    
        database.insert({name, picture}).table("authors").then(data =>{
            console.log(data[0])
            res.json({message:"Author successfully registered in the Database!", "Data":req.body})
        }).catch(error=>{
            console.log(error)
        }) 
    };

    readAuthors(req, res){
        database.select("*").from('authors').asCallback(function(err, rows) {
            if (err) return console.error(err);
            res.send(rows)
        })  
    };

    editAuthors(req, res){
        const {idAuthor} = req.params
        const {name, picture} = req.body

        database('authors').where({idAuthor:idAuthor}).update({ name:name, picture:picture}).then(data =>{
            res.json({message:"Author edited successfully!"})
        }).catch(error =>{
            res.json(error)})
    };

    deleteAuthors(req, res){
        const {idAuthor} = req.params

        database.where({idAuthor:idAuthor}).del().table("authors").then(data =>{
            res.json({message: "Author successfully removed from database!"})
        }).catch(error =>{
            res.json(error)
        })
    };

};

module.exports = new Authors();