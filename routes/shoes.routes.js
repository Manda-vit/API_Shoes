const express = require('express');
const app = express();
const ShoesRoutes = express.Router();

let Shoes = require('../model/shoes');

// api to add Shoes
ShoesRoutes.route('/add').post(function (req, res) {
    let shoes = new Shoes(req.body);
    shoes.save()
        .then(shoes => {
            res.status(200).json({ 'status': 'success', 'mssg': 'Shoes added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
        });
});

// api to get Shoes
ShoesRoutes.route('/').get(function (req, res) {
    Shoes.find(function (err, shoes) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'Shoes': shoes });
        }
    });
});

// api to get Shoes
ShoesRoutes.route('/shoes/:id').get(function (req, res) {
    let id = req.params.id;
    Shoes.findById(id, function (err, shoes) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'Shoes': shoes });
        }
    });
});

// api to update route
ShoesRoutes.route('/update/:id').put(function (req, res) {
    Shoes.findById(req.params.id, function (err, shoes) {
        if (!shoes) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {
            shoes.name = req.body.name;
            shoes.brand = req.body.brand;
            shoes.edition = req.body.edition;
            shoes.material = req.body.material;

            shoes.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
            })
        }
    });
});

// api for delete
ShoesRoutes.route('/delete/:id').delete(function (req, res) {
    Shoes.findByIdAndRemove({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});

module.exports = ShoesRoutes;