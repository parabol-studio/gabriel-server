[![https://nodei.co/npm/gabriel-server.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/gabriel-server.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/gabriel-server)

[![Node version](https://img.shields.io/node/v/gabriel-server.svg?style=flat)](http://nodejs.org/download/)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)


# Gabriel - server

This package accopanies the `Gabriel - client` package.

This tool is used as a QA reporting tool which helps QA communicate context to developers by reporting the applications localStorage values, cookies, console logs and any custom data you wish.

## Instalation

`npm i gabriel-server`

## Usage

At the top of your node file, include this line:

```
const gabriel = require('gabriel-server');
```


### Store report

To store reports, call the .store() function in your Node/Express application:

```
gabriel.store(app);
```

This will store your reports in a /reports directory to be used later by the UI.


### Serve UI

Gabriel has a basic UI which will create a route named `/gabriel/reports` to be used by the application to fetch the reports. It also creates a subdiretory named `/gabriel` which you can navigate to to view your reports. Add these routes to your applcication by including the following line in your Node applicaiton.

```
gabriel.serve(app);
```


## Run in dev mode

To run in dev mode simply clone the repo, navigate to the directory and run `npm run dev` which will allow you to edit the UI directly with the Angular CLI on port 4000. You can also run `npm run prod` to serve the UI from the Node.js server. This will run Gabriel, including the UI, on your local machine at `localhost:8085`. You will need to supply some sample logs in the `/logs` directory.
