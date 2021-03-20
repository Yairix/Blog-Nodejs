const database = require('../database/connection');

class Articles{

    createTable(req, res){
        database.schema.raw('USE jungleDevs;').raw('CREATE TABLE IF NOT EXISTS articles(idArticle INT AUTO_INCREMENT NOT NULL PRIMARY KEY, idAuthor INT NOT NULL, category VARCHAR(65) NOT NULL, title VARCHAR(85) NOT NULL, summary TEXT NOT NULL, firstParagraph TEXT NOT NULL, body TEXT NOT NULL,CONSTRAINT idAuthor FOREIGN KEY (idAuthor) REFERENCES authors (idAuthor));').then(data =>{
            res.json({message: "Table created with success!"})
        }).catch(error =>{
            res.json(error)
        })
    };

    createArticles(req, res){ 
        const {idAuthor, category, title, summary, firstParagraph, body} = req.body
    
        database.insert({idAuthor, category, title, summary, firstParagraph, body}).table("articles").then(data =>{
            console.log(data[0])
            res.json({message:"Article successfully registered in the Database!", "Data":req.body})
        }).catch(error=>{
            console.log(error)
        }) 
    };

    readArticles(req, res){
        database.select("*").from('articles').then(data =>{
            res.json({"List of articles": data})
        }).catch(error =>{
            res.json(error)})
    };

    editArticles(req, res){
        const {idArticle} = req.params
        const {idAuthor, category, title, summary, firstParagraph, body} = req.body

        database('articles').where({idArticle:idArticle}).update({ idAuthor:idAuthor, category:category, title:title, summary:summary, firstParagraph:firstParagraph,body:body }).then(data =>{
            res.json({message:"Article edited successfully!", "New Data":req.body, "Data":data})
        }).catch(error =>{
            res.json(error)})
    };

    deleteArticles(req, res){
        const {idArticle} = req.params

        database.where({idArticle:idArticle}).del().table("articles").then(data =>{
            res.json({message: "Article successfully removed from database!", "Deleted:":idArticle})
        }).catch(error =>{
            res.json(error)
        })
    };

    readArticlesCategory(req, res){
        const { category } = req.params;
        
        let articlesCall = []
        let displayArticle = []
        
        database("articles").join("authors","articles.idAuthor","=", "authors.idAuthor").where({category:category}).then(data =>{
            
            for (const row of data) {
                displayArticle = {
                    "idAuthor": {
                        "name": row.name,
                        "picture": row.picture
                    },
                    "category": row.category,
                    "title": row.title,
                    "summary": row.summary,
                    "firstParagraph": row.firstParagraph,
                    "body": row.body
                }
                articlesCall.push(displayArticle)
            }
            res.send(articlesCall)
        }).catch(error =>{
            res.json(error)
        });    
    };
    
}

module.exports = new Articles();