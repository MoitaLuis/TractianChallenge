const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Post = require('./schemas/post');
const bodyParser = require('body-parser');
const Company = require('./schemas/company');
const Asset = require('./schemas/asset');
const User = require('./schemas/user');
const Unit = require('./schemas/unit');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage})
const fs = require('fs');
const path = require('path');
require('dotenv/config');



app.use(bodyParser.json());

//GET
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

app.get('/units', (req, res) => {
    Unit.find()
        .then(units => {
            res.json(units);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

app.get('/assets', (req, res) => {
    Asset.find()
        .then(assets => {
            res.json(assets);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

app.get('/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
    
//unit by id
app.get('/units/:id', (req, res) => {
    Unit.findById(req.params.id)
        .then(unit => {
            if (unit) {
                res.json(unit);
            } else {
                res.status(404).json({ message: 'Unit not found' });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//unit by company id
app.get('/units/company/:id', (req, res) => {
    Unit.find({companyId: req.params.id})
        .then(unit => {
            if (unit) {
                res.json(unit);
            } else {
                res.status(404).json({ message: 'Unit not found' });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//assets by unit id
app.get('/assets/:id', (req, res) => {
    Asset.find({unitId: req.params.id})
        .then(asset => {
            if (asset) {
                res.json(asset);
            } else {
                res.status(404).json({ message: 'Asset not found' });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//user by company id
app.get('/users/:id', (req, res) => {
    User.find({companyId: req.params.id})
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//POST
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

app.post('/units', (req, res) => {
    const unit = new Unit({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        adress: req.body.adress,
        phone: req.body.phone,
        companyId: req.body.companyId
    });
    unit.save()
        .then(result => {
            res.status(201).json({
                message: 'Unit created',
                createdUnit: unit
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

app.post('/assets', upload.single('image') , (req, res) => {
    const asset = new Asset({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        model: req.body.model,
        owner: req.body.owner,
        status: req.body.status,
        health_level: req.body.health_level,
        image: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        unitId: req.body.unitId
    });
    asset.validateSync()
    asset.save()
        .then(result => {
            res.status(201).json({
                message: 'Asset created',
                createdAsset: asset
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

app.post('/users', (req, res) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        companyId: req.body.companyId
    });
    user.save()
        .then(result => {
            res.status(201).json({
                message: 'User created',
                createdUser: user
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//PUT
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

app.put('/units/:unitId', (req, res) => {
    Unit.findByIdAndUpdate(req.params.unitId, {
        $set: req.body
    }, {
        new: true
    })
        .then(unit => {
            res.json(unit);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

app.put('/assets/:assetId', (req, res) => {
    Asset.findByIdAndUpdate(req.params.assetId, {
        $set: req.body
    }, {
        new: true
    })
        .then(asset => {
            res.json(asset);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

app.put('/users/:userId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, {
        $set: req.body
    }, {
        new: true
    })
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//DELETE
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

app.delete('/units/:unitId', (req, res) => {
    Unit.findByIdAndRemove(req.params.unitId)
        .then(unit => {
            res.json({
                message: 'Unit deleted',
                deletedUnit: unit
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


app.delete('/assets/:assetId', (req, res) => {
    Asset.findByIdAndRemove(req.params.assetId)
        .then(asset => {
            res.json({
                message: 'Asset deleted',
                deletedAsset: asset
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

app.delete('/users/:userId', (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            res.json({
                message: 'User deleted',
                deletedUser: user
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

mongoose.connect(process.env.DB_CONNECTION, () => console.log("Connected to database"));