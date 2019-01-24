'use strict';

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const express = require('express');
const isJSON = require('is-json');
const app = express();

/****************************************************************************
* Function init()
* This function should be called to ensure that a /reports directory exists and
* load the logs into the global memory.
*****************************************************************************/
function init() {
  fs.readFile('.gabriel.json', 'utf-8', (err, config) => {
    if (isJSON(config)) global.gabriel_config = config;
  });

  fs.access('./reports', (err) => (err) ? fs.mkdirSync('./reports') : null);

  if (!global.gabriel_reports) {
    global.gabriel_reports = [];

    fs.readdir('./reports/', (err, files) => {
      if (files) {
        files.forEach(file => {
          fs.readFile(`./reports/${ file }`, 'utf-8', (err, report) => {
            if (isJSON(report)) global.gabriel_reports.push(JSON.parse(report));
          });
        });
      }
    });
  }
}

/****************************************************************************
* Function store()
* This function is used to gather data on the client side to be used in
* report.
*****************************************************************************/
function store(app) {
  init();

  app.post('/gabriel/store', (req, res) => {
    fs.writeFile(`./reports/${ moment().format('x') }.json`, JSON.stringify(req.body), (err) => (err) ? console.log(err) : null);
    res.status(200).send('OK');
  });
}

/****************************************************************************
* Function serve()
* This function will add a route to your Express application /gabriel/reports
* which is used by the applciation to retrieve the reports from the Node.js
* layer.
* It also serves the application under the /gabriel/.. sub directory so you can
* view a UI that displays all your API logs.
*****************************************************************************/
function serve(app) {
  init();
  
  app.get('/gabriel/reports', (req, res) => res.status(200).send(global.gabriel_reports));
  
  app.get(['/gabriel', '/gabriel/**'], (req, res) => {
    app.use(express.static(__dirname + '/dist'));
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}


module.exports = {
  store: store,
  serve: serve
};
