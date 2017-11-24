var router = require('express').Router();
var USERCLASS = require('../mongodb/mongoose_connection');
module.exports = router;

router.get('/', do_homepage);

function do_homepage(req, res){
    console.log('doing homepage');
    res.render('index');
}

// UI routes eg dropdowns, checkboxes etc
router.get('/api/v6/get_jobs', get_unique_jobs);
router.get('/api/v6/get_colours', get_unique_colours);

function get_unique_jobs(req, res){
    console.log('getting unique jobs');
    USERCLASS.find().distinct('job').then(function (jobs){
        console.log(jobs);
        res.json(jobs);
    });
}

function get_unique_colours(req, res){
    console.log('getting unique colours');
    USERCLASS.find().distinct('favourite_colours').then(function (colours){
        console.log(colours);
        res.json(colours);
    });
}

// api

router.get('/api/v6/read', do_read);
//router.get('/api/v6/read/:_id', do_read_one);
router.post('/api/v6/create', do_create);
router.put('/api/v6/update', do_update);
router.delete('/api/v6/delete/:_id', do_delete);

function do_read(req, res){
    console.log('reading all data');
    USERCLASS.find().then(function (results){
        console.log(results);
        res.json(results);
    });
}

function do_create(req, res){
    console.log('creating employee');
    console.log(req.body);
    var data = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        job: req.body.job,
        favourite_colours: req.body.favourite_colours,
        avatar: req.body.avatar
    }
    var user = new USERCLASS(data);
    user.save().then(function (result){
        console.log(result);
        res.json({message: 'backend created!'})
    });
}

function do_update(req, res){
    console.log('updating employee');
    console.log(req.body);
    var update = {
        $set: {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            job: req.body.job,
            favourite_colours: req.body.favourite_colours,
            avatar: req.body.avatar
        }
    }
    USERCLASS.findByIdAndUpdate(req.body._id, update).then(function (result){
        console.log(result);
        res.json({message: 'backend updated!'})
    });
}

function do_delete(req, res){
    console.log('deleting employee');
    console.log(req.params);
    USERCLASS.findByIdAndRemove(req.params._id).then(function (result){
        console.log(result);
        res.json({message: 'backend deleted!'})
    });
}

