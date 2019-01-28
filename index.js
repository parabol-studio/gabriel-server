'use strict';

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');
const isJSON = require('is-json');

/****************************************************************************
* Function init()
* This function should be called to ensure that a /reports directory exists and
* load the logs into the global memory.
*****************************************************************************/
function init() {
  fs.readFile('.gabriel.json', 'utf-8', (err, config) => {
    if (isJSON(config)) global.gabriel_config = JSON.parse(config);
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
    res.status(200).send({ body: 'OK' });
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

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/gabriel/reports', (req, res) => {
    if (req.headers.uuid === global.gabriel_session) res.status(200).send(global.gabriel_reports).end();
    else res.status(401).send().end();
  });

  app.post('/gabriel/auth', (req, res) => {
    if (req.body.password === global.gabriel_config.secret) {
      global.gabriel_session = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      res.status(200).send({ uuid: global.gabriel_session }).end();
    } else res.status(500).send({ error: 'Password is incorrect' }).end();
  });

  app.get(['/gabriel', '/gabriel/**'], (req, res) => {
    app.use(express.static(__dirname + '/dist'));
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

  app.listen(8002, () => console.log('Gabriel running on port 8002')
  );
}


module.exports = {
  store: store,
  serve: serve
};
