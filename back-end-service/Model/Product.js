const mongoose = require('mongoose');
const __Schema = new mongoose.Schema({
    productName: {
        type: String,
        require: true,
        min: 1
    },
    quantity: {
        type: Number,
        require: true
    },
    costPrice: {
        type: Number,
        require: true
    },
    sellingPrice: {
        type: Number,
        require: true
    }
}, { collection: "Products" });

const ProductSchema = mongoose.model('ProductSchema', __Schema);
module.exports = ProductSchema;