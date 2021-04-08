const ArticlesService = require('../src/articles-service');
const knex = require('knex');

describe('Shopping List Service Object:', function() {
  
  let db;
  let testItems =  [
    {
      name: 'Fish Tick-Tick Booms',
      price: 13.10,
      category: 'Main',
      checked: false,
      date_added: new Date.now()
    },
    {
      name: 'Notty Dawgs',
      price: 4.99,
      category: 'Snack',
      checked: true,
      date_added: new Date.now()
      },
    {
      name: 'Bluffo Dings',
      price: 5.50,
      category: 'Snack',
      checked: false,
      date_added: new Date.now()
    },
    {
      name: 'Guacamúle Ensalada',
      price: 1.24,
      category: 'Lunch',
      checked: false,
      date_added: new Date.now()
    },
    {
      name: 'Frodo Bagginzees',
      price: 2.50,
      category: 'Breakfast',
      checked: false,
      date_added: new Date.now()
    },
  ]

  // define the database connection (via knex)
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })

  it('getAllItems() gets all the items from shopping_list table', () => {})

  it('updateItem() toggles the checked property of a specific item', () => {})

  it('addItem() adds an item to the shopping_list table', () => {})

  it('deleteItem() deletes an item from the shopping_list table', () => {})

})



////////////////////
/* 
getAllItems()
updateItem()
addItem()
deleteItem()
 */