var bodyParser = require('body-parser');
var moongose = require('mongoose');
var objJson = [];
var urlencodedParser = bodyParser.urlencoded({ extended: false });    

// Connect to the database
moongose.connect('mongodb://adiv:test@ds241668.mlab.com:41668/todonode')

// Define db Schema
var dbSchema = new moongose.Schema({
    item : String
});

// Define model
var Todo = moongose.model('Todo', dbSchema);

module.exports = function(app){
    app.get('/get_json', function(req, res){
        res.send(objJson);
    })
    app.get('/todo',function(req, res){
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {data : data});            
        })
    });
    app.post('/todo', urlencodedParser, function(req, res){
        var addData = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(objJson);            
        })
    });
    app.delete('/todo/:item',function(req, res){
        Todo.find({item : req.params.item}).remove(function(err, data){
            if(err) throw err;
            res.json(objJson);            
        })
    })
}