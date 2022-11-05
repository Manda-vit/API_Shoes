const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Shoes = new Schema({
    name: {
        type: String
    },
    brand: {
        type: String
    },
    edition: {
        type: String
    },
    material: {
        type: String
    }
}, {
    collection: 'shoes'
});

module.exports = mongoose.model('Shoes', Shoes);