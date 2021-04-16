// psql -U dunder_mifflin -d knex-practice-test

const { default: knex } = require('knex');

const ShoppingListService = {
  getAllItems(knex) {
    return (
      knex
        .select('*')
        .from('shopping_list')
        // .then((result) => {
        //   console.log(result)
        //   return result;
        // })
        .then((result) => {
          return result.map((row) => {
            // console.log(row);
            return { ...row, price: Number(row.price) };
          });
        })
    );
  },
  getItemById(knex, id) {
    return knex
      .select('*')
      .from('shopping_list')
      .where({ id })
      .first()
      .then((row) => {
        return { ...row, price: Number(row.price) };
      });
  },
  updateItem(knex, id, newItemData) {
    return knex('shopping_list').where({ id }).update(newItemData);
  },
  addItem(knex, newItem) {
    // knex.select("*").from('shopping_list').then(response => console.log(response));
    return knex
      .returning('*')
      // .returning(['id','name','price','category','checked','date_added'])
      .insert(newItem)
      .into('shopping_list')
      // .returning('*')
      // .returning(['id','name','price','category','checked','date_added'])
      // .then((result) => {
      //   console.log(result);
      //   return result
      // })
      .then((rows) => {
        // console.log(rows[0]) // <<<<<<<<<<<<< WHAT'S THIS TELLING ME? 
        return rows[0]
      })
      .then((result) => {
        // console.log(result);
        // return { ...items, price: Number(items.price) }; // original -- works only for an empty list
        return { ...result, price: Number(result.price) };
        // console.log(typeof(result));
        // console.log(result);
        // return result.map((row) => {
        //   // console.log(row);
        //   return { ...row, price: Number(row.price) };
        // });
      })
      .catch(function(err) {
        console.log('OH NOOOOOOOOOOOOES!...')
        console.error(err);
      })
  },
  deleteItem(knex, id) {
    // find item id, store its array index as "idIndex"
    // const testItems;
    return knex
      .from('shopping_list')
      .select('*')
      .then(listItems => {
        const itemToDeleteIndex = listItems.findIndex(itemToDelete => itemToDelete.id === id);
        return listItems.splice(itemToDeleteIndex, 1);
      })
      // .then(itemToDelete => {
      //   return knex
      //     .from('shopping_list')
      //     .select('*')
      //     .then()
      // })
      // .then(results => console.log(results)); // for now, this chain only finds the index of the thing to delete :P

    // testItems.splice(idIndex, 1);
  }
};

module.exports = ShoppingListService;
