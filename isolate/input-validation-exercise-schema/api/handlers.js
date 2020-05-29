const util = require('util');
const path = require('path');
const fs = require('fs');
const tv4 = require('tv4');

const FURNITURE_SCHEMA = require('../data/furniture-schema.json');
const DATA_PATH = path.join(__dirname, '..', 'data', 'furniture-data.json');

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const handlers = {
  create: async (req, res) => {

    const newFurniture = req.body

    try {
      const furnitureDataString = await readFile(DATA_PATH, 'utf-8');
      const furnitureData = JSON.parse(furnitureDataString);

      // newFurniture.id = furnitureData.nextId;
      // furnitureData.nextId++;

      const isValid = tv4.validate(newFurniture, FURNITURE_SCHEMA)

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

      furnitureData.push(newFurniture);

      const newFurnitureDataString = JSON.stringify(furnitureData, null, '  ');

      await writeFile(DATA_PATH, newFurnitureDataString);

      res.json(newFurniture);

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
      const furnitureDataString = await readFile(DATA_PATH, 'utf-8');
      const furnitureData = JSON.parse(furnitureDataString);

      res.json(furnitureData);

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
      const furnitureDataString = await readFile(DATA_PATH, 'utf-8');
      const furnitureData = JSON.parse(furnitureDataString);
      const selectedFurniture = furnitureData.find(furniture => furniture.id === idToUpdate);

      res.json(selectedFurniture);

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

    const newFurniture = req.body
    newFurniture.id = idToUpdate;
    const isValid = tv4.validate(newFurniture, FURNITURE_SCHEMA)

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
      const furnitureDataString = await readFile(DATA_PATH, 'utf-8');
      const furnitureData = JSON.parse(furnitureDataString);

      const entryToUpdate = furnitureData.find(furniture => furniture.id === idToUpdate);

      if (entryToUpdate) {
        const indexOfFurniture = furnitureData
          .indexOf(entryToUpdate);
        furnitureData.indexOfFurniture = newFurniture;

        const newFurnitureDataString = JSON.stringify(furnitureData, null, '  ');

        await writeFile(DATA_PATH, newFurnitureDataString);

        res.json(newFurniture);
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
      const furnitureDataString = await readFile(DATA_PATH, 'utf-8');
      let furnitureData = JSON.parse(furnitureDataString);

      const entryToDelete = furnitureData.find(furniture => furniture.id === idToDelete);

      if (entryToDelete) {
        furnitureData = furnitureData.filter(furniture => furniture.id !== entryToDelete.id);

        const newFurnitureDataString = JSON.stringify(furnitureData, null, '  ');

        await writeFile(DATA_PATH, newFurnitureDataString);

        res.json(entryToDelete);
      } else {
        res.json(`no entry with id ${idToUpdate}`);
      }

    } catch (err) {
      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }


    }
  },
};

module.exports = handlers;
