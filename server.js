var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool =require('pg').Pool;
var config = {
    user: 'sohelsheikh91',
    database: 'sohelsheikh91',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
};
var app = express();
app.use(morgan('combined'));

var articles ={
     'article-one' : { 
    title :'Article One | Sohel Sheikh',
    heading :'Article One',
    date :'Sep 5,2016',
    content:`    <p>
                        this the content for my new article. this the content for my new article this the content for my new article this the content for my new article.
                    </p>
                    <p>
                        this the content for my new article. this the content for my new article this the content for my new article this the content for my new article.
                    </p>
                    <p>
                        this the content for my new article. this the content for my new article this the content for my new article this the content for my new article.
                    </p>`
     },
     'article-two' : {
        title :'Article Two | Sohel Sheikh',
    heading :'Article Two',
    date :'Sep 5,2016',
    content:`    <p>
                        this the content for my new article. this the content for my new article this the content for my new article this the content for my new article.
                    </p>
                    <p>
                        this the content for my new article. this the content for my new article this the content for my new article this the content for my new article.
                    </p>
                    <p>
                        this the content for my new article. this the content for my new article this the content for my new article this the content for my new article.
                    </p>`
    },
    'article-three' :{
        title :'Article Three | Sohel Sheikh',
    heading :'Article Three',
    date :'Sep 5,2016',
    content:`    <p>
                        this the content for my new article. this the content for my new article this the content for my new article this the content for my new article.
                    </p>
                    <p>
                        this the content for my new article. this the content for my new article this the content for my new article this the content for my new article.
                    </p>
                    <p>
                        this the content for my new article. this the content for my new article this the content for my new article this the content for my new article.
                    </p>`}
    
};

function createTemplate (data){
    var title =data.title;
    var date= data.date;
    var heading= data.heading;
    var content = data.content;

var htmlTemplate =`
<html>
    <head> 
        <title>
            ${title}
        </title>
   <link href="/ui/style.css" rel="stylesheet" />
   </head>
    <body>
        <div class="contrainer">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                    </div>
        </div>
    </body>
    
    
</html>



`;
return htmlTemplate;
}
app.get('/', function (req, res) {
res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool = new Pool(config);
app.get('/test-db',function (req,res){
    pool.query('SELECT = FROM test', function(err , result){
        if (err){
            res.status(500).send(err.toString());
        }else {
            res.send(JSON.stringify(result));
            
        }
    });
});
var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});
app.get('/:articleName', function (req, res){
    var articleName = req.params.articleName;
res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
