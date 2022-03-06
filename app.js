const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Post = require('./schemas/post');
const bodyParser = require('body-parser');
const Company = require('./schemas/company');

require('dotenv/config');

app.use(bodyParser.json());

/* 
requests:

O    getAllCompanies
O    postCompanyUnit
O    updateCompanyUnit
O    deleteCompanyUnit

X    getAllUnits
X    postUnitUnit
X    updateUnit
X    deleteUnit

X    getAllAssets
X    getAssetsUnit1
X    getAssetsUnit2
X    postAssetUnit
X    updateAssetUnit
X    deleteAssetUnit

X    getAllUsers
X    getUsersUnit1
X    getUsersUnit2
X    postUserUnit
X    updateUserUnit
X    deleteUserUnit

*/

app.get('/', (req, res) => {
    res.send('oi');
});


app.get('/companies', (req, res) => {
    Company.find()
        .then(companies => {
            res.json(companies);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
    
app.post('/companies', (req, res) => {
    const company = new Company({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    });
    company.save()
        .then(result => {
            res.status(201).json({
                message: 'Company created',
                createdCompany: company
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

app.put('/companies/:companyId', (req, res) => {
    Company.findByIdAndUpdate(req.params.companyId, {
        $set: req.body
    }, {
        new: true
    })
        .then(company => {
            res.json(company);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

app.delete('/companies/:companyId', (req, res) => {
    Company.findByIdAndRemove(req.params.companyId)
        .then(company => {
            res.json({
                message: 'Company deleted',
                deletedCompany: company
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});






/*teste
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
*/

mongoose.connect(process.env.DB_CONNECTION, () => console.log("Connected to database"));


//listen
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

