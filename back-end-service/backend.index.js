const express = require("express");
// Import the library:
var cors = require('cors');

const app = express();
app.use(cors());

const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Import Router Controllers
try {
    const product = require("./Controller/Product.Controller");
    dotenv.config();
    //connect to db
    mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("Connected to Database");
        app.use(express.json());
        app.use("/api/", product);
        app.listen(process.env.BACKEND_SERVER_PORT, () => {
            console.log(`
            ============================================
                    BACKEND API SERVER STARTED
            ============================================
            `);
        });
    }, () => console.log("Error in connecting Database"));    
} catch(err) {
    console.log(err);
}