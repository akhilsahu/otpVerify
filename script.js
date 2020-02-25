const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const {getHomePage,otpVerify} = require('./routes/index');
const {resend,verify} = require('./routes/verification');
// const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player')
var app = express();
//Configuring express server
app.use(bodyParser.json());
var mysqlConnection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'notesfilesdownload',
multipleStatements: true
});
mysqlConnection.connect((err)=> {
if(!err)
console.log('Connection Established Successfully');
else
console.log('Connection Failed!!!!'+ JSON.stringify(err,undefined,2));
});
const port = process.env.PORT || 8080
global.db = mysqlConnection;
app.listen(port, () => console.log(`Listening on port ${port}..`));

app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
//Creating GET Router to fetch all the learner details from the MySQL Database


app.get('/', getHomePage);
app.get('/otpVerify/:phone_number/:id', otpVerify);
app.get('/resend/:phone_number',resend);
app.post('/verify',verify)

app.get('/users' , (req, res) => {
mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
if (!err)
res.send(rows);
else
console.log(err);
})
} );
