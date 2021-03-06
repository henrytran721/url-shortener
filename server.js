const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const {Schema} = mongoose;
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const shortid = require('shortid');
const app = express();


const dev_db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gevd4.azure.mongodb.net/urlshortener?retryWrites=true&w=majority`;
const mongoDb = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const UrlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    urlCode: String,
    clickCount: Number
})

const Url = mongoose.model('Url', UrlSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/url-shorten', (req, res) => {
    let short = shortid.generate();
    console.log(req.body.url);
    let newUrl = new Url({
        originalUrl: req.body.url,
        shortUrl: `http://localhost:8080/v/${short}`,
        urlCode: short,
        clickCount: 0
    })

    newUrl.save((err) => {
        if(err) {
            res.send(new Error(err));
        } else {
            res.send({
                shortUrl: `http://localhost:8080/v/${short}`
            })
        }
    })
})

app.get('/v/:id', async (req, res) => {
    // query and return redirect url
    console.log(req.params.id);
    let shortcode = await Url.findOne({urlCode: req.params.id})
    // update record and increment count
    await Url.findOneAndUpdate({urlCode: req.params.id}, {clickCount: shortcode.clickCount + 1})
    res.redirect(shortcode.originalUrl);
})

app.post('/getstats', async (req, res) => {
    let stats = await Url.findOne({urlCode: req.body.url}); 
    if(stats) {
        res.json(stats);
    } else {
        res.status(400).send({
            message: "Error: No record found, please enter a valid URL"
        });
    }
})

app.listen(8080, () => {
    console.log('app is listening on port 8080');
})