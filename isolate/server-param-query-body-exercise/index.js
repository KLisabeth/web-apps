'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./middleware/logger');

// initialize the app
const app = express();

// log requests
app.use(logger);

// parse body
app.use(bodyParser.raw({type: "text/plain"}));
// parse queries
app.use(bodyParser.json());
// statically serve the frontend
app.use("/", express.static("public"));

app.post("/api/:value", (req, res) => {
  const paramValue = req.params.value;
  const queryValue = req.query.value;
  const bodyValue = req.body.value;

  console.log(`param value: ${paramValue}`);
  console.log(`query value: ${queryValue}`);
  console.log(`body value: ${bodyValue}`);

  const responseData = {
    paramValue,
    queryValue,
    bodyValue,
  };
  res.json(responseData);
});

// start the app
app.listen(config.PORT, () => {
  console.log(
    `App is listening at http://localhost:${config.PORT} (${config.MODE} mode)`
  );
});;
