const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./routes/api/routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api',router);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port} `) )