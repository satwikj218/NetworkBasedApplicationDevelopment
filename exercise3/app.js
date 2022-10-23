const express = require('express');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const ejs = require('ejs');

const app = express();
let port = 3000;
let host = "localhost";

app.set('view engine', 'ejs');

let students = [
    {id: '1', name: 'Alice', major: 'Computer Science', gpa: 3.2}, 
    {id: '2', name: 'Bob', major: 'Biology', gpa: 3.0}, 
    {id: '3', name: 'Charlie', major: 'Physics', gpa: 3.8},
];

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(morgan('tiny'));

app.get('/', (req, res) =>{
    res.sendFile('./views/index.html',{ root: __dirname });
});

app.get('/students', (req, res) =>{
    res.render('students.ejs', { student: true, students: students });
});

app.post('/students', (req, res) => {
    let student = req.body;
    student.id = uuidv4();
    students.push(student);
    res.redirect('/students');
});

app.get('/students/create', (req, res) =>{
    res.sendFile('./views/new.html', { root: __dirname });
});

//send students with particular id back to client
app.get('/students/:sid', (req, res) =>{
    let id = req.params.sid;
    let student = students.find(element => element.id === id);

    res.render('students.ejs', {student:true, student: student});
});

app.get('/about', (req, res) =>{
    res.send("About Page");
});

app.get('/contact', (req, res) =>{
    res.send("Contact Page");
});

app.get('/contact-us', (req, res) => {
    res.redirect('/contact');
});

app.use((req, res, next) => {
    res.status(404).send("Page cannot be found");
}); 

app.listen(port, host, ()=>{
    console.log("Server is running at port ", port);
});

