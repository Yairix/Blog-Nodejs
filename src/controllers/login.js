const database = require('../database/connection');

class Login{
    
    displayArticles(req, res){
        const {idArticle} = req.params

        let articlesCall = []
        let displayArt = []
        if(req.isAuthenticated()){  
            database("articles").join("authors","articles.idAuthor","=", "authors.idAuthor").where({idArticle:idArticle}).then(data =>{
            
                for (const row of data) {
                    displayArt = {
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
                    articlesCall.push(displayArt)
                }
                //console.log(articlesCall)
                res.send(articlesCall)
        
            }).catch(error =>{
                res.json(error)
            })      
        }else{
            database("articles").join("authors","articles.idAuthor","=", "authors.idAuthor").where({idArticle:idArticle}).then(data =>{
            
                for (const row of data) {
                    displayArt = {
                        "idAuthor": {
                            "name": row.name,
                            "picture": row.picture
                        },
                        "category": row.category,
                        "title": row.title,
                        "summary": row.summary,
                        "firstParagraph": row.firstParagraph
                    }
                    articlesCall.push(displayArt)
                }
                //console.log(articlesCall)
                res.send(articlesCall)
            }).catch(error =>{
                res.json(error)
            })
        }
    }
        

};

module.exports = new Login();