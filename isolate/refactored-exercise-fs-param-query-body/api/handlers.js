const fs = require("fs");
const path = require("path");
const config = require("../config");

const FILES_DIR = path.join(__dirname, "/..", config.FILES_DIR);

const handlers = {
  postParams: async (req, res) => {
    const paramValue = req.params.value;

    console.log(`param value: ${paramValue}`);

    const fileName = "param.txt";
    try {
      await fs.writeFile(`${FILES_DIR}/${fileName}`, paramValue, (err) => {
        if (err && err.code === "ENOENT") {
          console.log(err);
          res.status(404).end();
          return;
        }
        if (err) {
          console.log(err);
          next(err);
          return;
        }

        res.json({
          message: `'${paramValue}' saved to ${fileName}`,
        });
      });
    } catch (err) {
      console.log(Error.message);
    }
  },

  postQuery: async (req, res) => {
    const queryValue = req.query.value;

    console.log(`query value: ${queryValue}`);

    const fileName = "query.txt";
    try {
      await fs.writeFile(`${FILES_DIR}/${fileName}`, queryValue, (err) => {
        if (err && err.code === "ENOENT") {
          console.log(err);
          res.status(404).end();
          return;
        }
        if (err) {
          console.log(err);
          next(err);
          return;
        }

        res.json({
          message: `'${queryValue}' saved to ${fileName}`,
        });
      });
    } catch (err) {
      console.log(Error.message);
    }
  },

  bodyValue: async (req, res) => {
    const bodyValue = req.body.value;

    console.log(`body value: ${bodyValue}`);

    const fileName = "body.txt";
    try {
      await fs.writeFile(`${FILES_DIR}/${fileName}`, bodyValue, (err) => {
        if (err && err.code === "ENOENT") {
          console.log(err);
          res.status(404).end();
          return;
        }
        if (err) {
          console.log(err);
          next(err);
          return;
        }

        res.json({
          message: `'${bodyValue}' saved to ${fileName}`,
        });
      });
    } catch (err) {
      console.log(Error.message);
    }
  },
};

module.exports = handlers;
