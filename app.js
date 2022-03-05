const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv/config');

//create read update delete
app.get('/', (req, res) => {
    res.send('oi');
});

mongoose.connect(process.env.DB_CONNECTION, () => console.log("Connected to database"));


//listen
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

