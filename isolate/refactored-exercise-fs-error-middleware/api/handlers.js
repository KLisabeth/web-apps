const fs = require("fs");
const path = require("path");
const config = require("../config");

const FILE_DIR = path.join(__dirname, "/..", config.FILES_DIR);

const handlers = {
  getList: async (req, res, next) => {
    try {
      await fs.readdir(FILE_DIR, (err, data) => {
        if (err) {
          next(err);
          return;
        }

        console.log("this is the directory listing", data);
        res.json(data);
      });
    } catch (err) {
      console.error(Error);
      
    }
  },
  createName: async (req, res, next) => {
    const name = req.query.name;

    // check if file already exists

    const content = req.body.fileContent;
    try {
      await fs.writeFile(`${FILE_DIR}/${name}`, content, (err) => {
        if (err) {
          next(err);
          return;
        }

        res.sendStatus(200);
      });
    } catch (err) {
      console.error(Error);
      ;
    }
  },
};

module.exports = handlers;
