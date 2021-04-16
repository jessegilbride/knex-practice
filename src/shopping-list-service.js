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
    return knex
      .returning('*')
      .insert(newItem)
      .into('shopping_list')
      .then((rows) => {
        return rows[0]
      })
      .then((result) => {
        // console.log(result);
        return { ...result, price: Number(result.price) };
      });
  },
  deleteItem(knex, id) {
    return knex
      .from('shopping_list')
      .select('*')
      .then(listItems => {
        const itemToDeleteIndex = listItems.findIndex(itemToDelete => itemToDelete.id === id);
        listItems.splice(itemToDeleteIndex, 1);
        // const deletedItem = listItems.splice(itemToDeleteIndex, 1); // for use in case of need to compare what's been deleted
        // console.log(deletedItem);
        // return {listItems, deletedItem};


        return listItems.map(row => {
          return { ...row, price: Number(row.price) }
        })
      })
  }
};

module.exports = ShoppingListService;
