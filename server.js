const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const UserRoute = require('./routes/Utilisateur');
const ProfilRoute = require('./routes/Profil');
const MatiereRoute = require('./routes/Matiere');
const AssignmentRoute = require('./routes/Assignment');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use('/user',UserRoute)
app.use('/profil',ProfilRoute)
app.use('/matiere',MatiereRoute)
app.use('/assignment',AssignmentRoute)

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});

app.listen(PORT, () => {
    console.log("Server is listening on port "+PORT);
});