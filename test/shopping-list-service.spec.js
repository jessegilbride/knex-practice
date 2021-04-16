// psql -U dunder_mifflin -d knex-practice-test

const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');
const { expect } = require('chai');

describe(`Shopping List Service Object:`, function () {
  let db;
  let testItems = [
    {
      id: 1,
      name: 'Fish Tick-Tick Booms',
      price: 13.1,
      category: 'Main',
      checked: false,
      date_added: new Date('1919-12-22T16:28:32.615Z'),
    },
    {
      id: 2,
      name: 'Notty Dawgs',
      price: 4.99,
      category: 'Snack',
      checked: true,
      date_added: new Date('1919-12-22T16:28:32.615Z'),
    },
    {
      id: 3,
      name: 'Bluffo Dings',
      price: 5.5,
      category: 'Snack',
      checked: false,
      date_added: new Date('1919-12-22T16:28:32.615Z'),
    },
    {
      id: 4,
      name: 'Guacamúle Ensalada',
      price: 1.24,
      category: 'Lunch',
      checked: false,
      date_added: new Date('1919-12-22T16:28:32.615Z'),
    },
    {
      id: 5,
      name: 'Frodo Bagginzees',
      price: 2.5,
      category: 'Breakfast',
      checked: false,
      date_added: new Date('1919-12-22T16:28:32.615Z'),
    },
  ];

  // define the database connection (via knex)
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  // truncate (clear) the shopping_list table to have a fresh start every time
  before(() => db('shopping_list').truncate());
  afterEach(() => db('shopping_list').truncate());

  // disconnect from the database at the end of all the tests
  after(() => db.destroy());

  context(`Given that shopping_list has items (data)...`, () => {
    // populate shopping_list table with testItems before each test
    beforeEach(() => {
      return db.into('shopping_list').insert(testItems);
    });

    it(`getAllItems() gets all the items from shopping_list table`, () => {
      return ShoppingListService.getAllItems(db).then((actual) => {
        expect(actual).to.deep.equal(testItems);
      });
    });

    it(`getItemById() gets the specified item from shopping_list table`, () => {
      const itemId = 1;
      const itemFromTestItems = testItems[itemId - 1];
      return ShoppingListService.getItemById(db, itemId).then((actual) => {
        expect(actual).to.deep.equal(itemFromTestItems);
      });
    });

    it(`updateItem() updates an item in the shopping_list table`, () => {
      const itemId = 1;
      const newItemData = {
        name: 'updated name',
        price: 123.45,
        // category: 'Lunch',
        checked: true,
        date_added: new Date(),
      };
      const oldItemData = testItems[itemId - 1];
      return ShoppingListService.updateItem(db, itemId, newItemData)
        .then(() => ShoppingListService.getItemById(db, itemId))
        .then((updatedItem) => {
          // console.log({updatedItem});
          expect(updatedItem).to.deep.equal({
            ...oldItemData,
            ...newItemData,
          });
        });
    });

    it('addItem() adds an item (row) to the shopping_list table', () => {
      const newItemData = {
        id: 6,
        name: 'A Very Expensive Snackeroo',
        price: 101.01,
        category: 'Snack',
        checked: true,
        date_added: new Date(),
      };
      const testItemsWithNewItemPushed = testItems;
      testItemsWithNewItemPushed.push(newItemData);
      // console.log(testItemsWithNewItemPushed)

      return ShoppingListService.addItem(db, newItemData)
        // .then((result) => {
        //   console.log("the result is...")
        //   console.log(result);
        //   return result
        // })
        .then((updatedTestItems) => {
          expect(updatedTestItems).to.deep.equal(newItemData);
        });
    });

    it.only('deleteItem() deletes an item from the shopping_list table', () => {
      const id = 3;
      const deletionIndex = testItems.findIndex(itemToDelete => itemToDelete.id === id);
      const expected = testItems.splice(deletionIndex, 1);
      return ShoppingListService.deleteItem(db, id)
        .then(actual => {
          // console.log(actual);
          expect(actual).to.deep.equal(expected)
        })
    })
  });

  context(`Given that shopping_list has no items (no data)...`, () => {
    it('getAllItems() resolves an empty array', () => {
      return ShoppingListService.getAllItems(db).then((actual) => {
        expect(actual).to.deep.equal([]);
      });
    });
    
    it('addItem() adds an item to the shopping_list table', () => {
      const newItemData = {
        id: 7,
        name: 'A Very Cheap Snackeroondoon',
        price: 1.01,
        category: 'Snack',
        checked: false,
        date_added: new Date()
      };
      return ShoppingListService.addItem(db, newItemData)
        // .then((result) => {
        //   console.log("the result is...")
        //   console.log(result);
        //   return result
        // })
        .then((actual) => {
          // console.log(actual);
          expect(actual).to.deep.equal(newItemData);
        });
    });
  });
});
