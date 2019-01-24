'use strict';

/* Node modules */
const express = require('express');
const cors = require('cors');
const gabriel = require('./index');
const app = express();

app.use(cors());

gabriel.serve(app);

app.listen(8085, () => console.log('Node server running on port 8085'));
