const express = require('express')
// const { v4: uuid } = require('uuid') // UUID is not installed with boilerplate
// const logger = require('./logger') // Winston (thus, logger) is not installed with boilerplate
// const { dataItem1, dataItem2 } = require('./store') // local data storage

const routerName = express.Router()
const bodyParser = express.json()

routerName
  .route('/path')
  .get((req, res) => {
    res.json(someJSONtoSend);
  })
  .post(bodyParser, (req, res) => {
    const { destructuredJSONitem1, destructuredJSONitem2 } = req.body;

  if (!destructuredJSONitem1) {
    logger.error(`item1 is required`);
    return res
      .status(400)
      .send('Invalid data');
  }
  
  if (!destructuredJSONitem2) {
    logger.error(`item2 is required`);
    return res
      .status(400)
      .send('Invalid data');
  }
  
  // const id = uuid(); // get an id (if needed)

  logger.info(`Thingy was created with id: ${id}`);

  res.json(someJSONtoSend);
  })

module.exports = routerName
