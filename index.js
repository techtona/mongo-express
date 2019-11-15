let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'))
app.use(bodyParser.json());
let port = 8000

mongoose.connect('mongodb+srv://test:test@freecluster-wjdyt.mongodb.net/test',{
    useUnifiedTopology : true, useNewUrlParser : true, 
    useCreateIndex: true
});
let db = mongoose.connection;
if(!db)
    console.log("Database connection error")
else
    console.log("DB Connected")

let routes = require('./routes')
app.use('/api', routes)

app.listen(port, function(){
    console.log("App running on port "+port)
})