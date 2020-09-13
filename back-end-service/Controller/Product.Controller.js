const product = require("express").Router();
const ProductSchema =  require("../Model/Product");

product.get("/products", async (req, res) => {
    const productName =  req.query.productName;
    const searchQuery = {};
    if (productName)
        searchQuery.productName = productName;
    try {
        res.setHeader('Content-Type', 'application/json');
        await ProductSchema.find(searchQuery, (err, products) => {
            if (err)
                return res.status(500).send("Server Error Occurred.");
            return res.status(200).send(products);
        })
    } catch(err) {
        return res.status(500).send(err.message);
    }
});

product.post("/product", async (req, res) => {
    try {
        if (req.body.costPrice > req.body.sellingPrice) {
            res.status(404).send({errorMessage: "Const Price Can not be Less than Selling Price"});
            res.end();
        } else {
            const _product = new ProductSchema({
                productName: req.body.productName,
                quantity: req.body.quantity,
                costPrice: req.body.costPrice,
                sellingPrice: req.body.sellingPrice
            });    
            const newProduct = await _product.save();
            res.status(200).send(newProduct);
            res.end();
        } 
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        res.end();
    }
});

product.put("/product/:productId", async (req, res) => {
    const _id = req.params.productId;
    try {
        if (req.body.costPrice > req.body.sellingPrice) {
            res.status(404).send({errorMessage: "Const Price Can not be Less than Selling Price"});
            res.end();
        } else {
            const productToUpdate = await ProductSchema.findOne({_id: _id});
            const updatedProduct = await productToUpdate.updateOne(req.body);
            res.status(200).send(updatedProduct);
        }
    } catch(err) {
        res.status(500).send(err.message);
    }
});

product.delete("/product/:productId", async (req, res) => {
    const _id = req.params.productId;
    try {
        const deletedProduct = await ProductSchema.findByIdAndDelete(_id);
        res.status(200).send(deletedProduct);
    } catch(err) {
        res.status(500).send(err.message);
    }
});

module.exports = product;