const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Post = require('./schemas/post');
const bodyParser = require('body-parser');

require('dotenv/config');

app.use(bodyParser.json());

/* 
requests:

getAllCompanies
getCompaniesUnit1
getCompaniesUnit2
postCompanyUnit
updateCompanyUnit
deleteCompanyUnit

getAllUnits
getUnitsUnit1
getUnitsUnit2
postUnitUnit
updateUnitUnit
deleteUnitUnit

getAllAssets
getAssetsUnit1
getAssetsUnit2
postAssetUnit
updateAssetUnit
deleteAssetUnit

getAllUsers
getUsersUnit1
getUsersUnit2
postUserUnit
updateUserUnit
deleteUserUnit

*/

//create read update delete
app.get('/', (req, res) => {
    res.send('oi');
});

app.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    try{
        const result = await post.save();
        post.save();
        res.json(result);

    }catch(err){
        res.json({message: err});
    }

});


mongoose.connect(process.env.DB_CONNECTION, () => console.log("Connected to database"));


//listen
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

