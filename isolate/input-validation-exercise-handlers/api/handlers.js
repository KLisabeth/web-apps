const util = require('util');
const path = require('path');
const fs = require('fs');
const tv4 = require('tv4');

const FRUIT_SCHEMA = require('../data/fruit-schema.json');
const DATA_PATH = path.join(__dirname, '..', 'data', 'fruit-data.json');

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const handlers = {
  create: async (req, res) => {

    const newFruit = req.body

    try {
      const fruitDataString = await readFile(DATA_PATH, 'utf-8');
      const fruitData = JSON.parse(fruitDataString);

      // newFruit.id = fruitData.nextId;
      // fruitData.nextId++;

      const isValid = tv4.validate(newFruit, FRUIT_SCHEMA);

      if (!isValid) {
        const error = tv4.error;
        console.error(error)

        res.status(400).json({
          error: {
            message: error.message,
            dataPath: error.dataPath
          }
        })
        return
      }

      fruitData.push(newFruit);

      const newFruitDataString = JSON.stringify(fruitData, null, '  ');

      await writeFile(DATA_PATH, newFruitDataString);

      res.json(newFruit);

    } catch (err) {
      console.log(err);

      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }

    }

  },
  readAll: async (req, res) => {
    try {
      const fruitDataString = await readFile(DATA_PATH, 'utf-8');
      const fruitData = JSON.parse(fruitDataString);

      res.json(fruitData);

    } catch (err) {
      console.log(err)

      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }

    }
  },
  readOne: async (req, res) => {
    const idToUpdateStr = req.params.id;
    const idToUpdate = Number(idToUpdateStr);

    try {
      const fruitDataString = await readFile(DATA_PATH, 'utf-8');
      const fruitData = JSON.parse(fruitDataString);
      const selectedFruit = fruitData.find(file => file.id === idToUpdate);

      res.json(selectedFruit);

    } catch (err) {
      console.log(err)

      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }

    }
  },
  update: async (req, res) => {
    const idToUpdateStr = req.params.id;
    const idToUpdate = Number(idToUpdateStr);

    const newFruit = req.body
    newFruit.id = idToUpdate;
    const isValid = tv4.validate(newFruit, FRUIT_SCHEMA)

    if (!isValid) {
      const error = tv4.error
      console.error(error)

      res.status(400).json({
        error: {
          message: error.message,
          dataPath: error.dataPath
        }
      })
      return
    }

    try {
      const fruitDataString = await readFile(DATA_PATH, 'utf-8');
      const fruitData = JSON.parse(fruitDataString);

      const entryToUpdate = fruitData.find(fruit => fruit.id === idToUpdate);

      if (entryToUpdate) {
        const indexOfFurniture = fruitData
          .indexOf(entryToUpdate);
        fruitData[indexOfFurniture] = newFruit;

        const newFruitDataString = JSON.stringify(fruitData, null, '  ');

        await writeFile(DATA_PATH, newFruitDataString);

        res.json(newFruit);
      } else {
        res.json(`no entry with id ${idToUpdate}`);
      }

    } catch (err) {
      console.log(err);

      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }

    }
  },
  delete: async (req, res) => {
    const idToDeleteStr = req.params.id;
    const idToDelete = Number(idToDeleteStr);

    try {
      const fruitDataString = await readFile(DATA_PATH, 'utf-8');
      let fruitData = JSON.parse(fruitDataString);

      const entryToDelete = fruitData
        .find(fruit => fruit.id === idToDelete);

      if (entryToDelete) {

        fruitData = fruitData
          .filter(fruit => fruit.id !== entryToDelete.id);

        const newFruitDataString = JSON.stringify(fruitData, null, '  ');

        await writeFile(DATA_PATH, newFruitDataString);

        res.json(entryToDelete);
      } else {
        res.json(`no entry with id ${idToUpdate}`);
      }

    } catch (err) {
      console.log(err);

      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }

    }
  },
};

module.exports = handlers;
