const knex = require('knex');
require('dotenv').config();

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function getItemsWithText() {
  knexInstance
}

function getItemsPaginated() {
  knexInstance
}

function getItemsAddedAfterDate() {
  knexInstance
}

function getCostForCategory() {
  knexInstance
}
