const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const request = require('xmlhttprequest').XMLHttpRequest;

const app = express()

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

const translationHistory = [];
let id = 0;

app.get('/', (req, res) => {
    const a = translationHistory.map(t => ({
        id: t.id,
        en: t.en,
        morse: t.morse,
    }));
    res.send(a);
});

app.post('/', (req, res) => {
    const {en} = req.body;
    let url = 'https://api.funtranslations.com/translate/morse.json?text=' + encodeURI(en);
    let translate = new request;
    translate.open('GET', url, false);
    translate.send(null);
    const morse = JSON.parse(translate.responseText).contents.translated;
    //const morse = 'hello';
    id++;
    const newEntry = {
        id: id,
        en,
        morse,
    };
    translationHistory.push(newEntry);
    res.status(200).send();
});

app.post('/delete', (req, res) => {
    const delID = req.body.delid;
    console.log("ID"+ delID);
    var index = translationHistory.findIndex(obj => obj.id==delID);
    translationHistory.splice(index, 1);
    console.log(translationHistory);
})


app.listen(8083, () => {
    console.log("Listening on port 8083");
});