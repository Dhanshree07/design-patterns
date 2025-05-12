import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
require('dotenv').config();

app.use(express.json());
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    try {
        console.log("connected" , PORT)
    }
    catch (err) {
        console.log(err)
    }
})
