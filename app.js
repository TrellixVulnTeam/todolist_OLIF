const express = require('express');
const bodyParser = require("body-parser");
const { set } = require('express/lib/application');
const date = require(__dirname + "/date.js");

const app = express();
const port = "8000";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items =[];
let workItems = [];




app.get('/', function(req, res){
   
    let day = date();

    res.render("list", {
        listTitle: day,
        addNewItem: items
    });

    
});


app.post('/', function(req, res){

    let item = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect('/work')
    }else{
        items.push(item);
     
    res.redirect('/')
    }

     
});

app.get('/work', function(req, res){

    let day = date();

    res.render("list", 
    {
        listTitle: "Work List " + day,
        addNewItem: workItems
    } );

});

app.get('/about', function(req, res){
    res.render("about")
});



app.listen(port, function(){
    console.log("server started on port " + port);

});

