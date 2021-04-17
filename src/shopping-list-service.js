// psql -U dunder_mifflin -d knex-practice-test

const { default: knex } = require('knex');

const ShoppingListService = {
  getAllItems(knex) {
    return (
      knex
        .select('*')
        .from('shopping_list')
        .then((result) => {
          return result.map((row) => {
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
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      .then((rows) => {
        return rows[0]
      })
      .then((result) => {
        return { ...result, price: Number(result.price) };
      });
  },
  deleteItem(knex, id) {
    return knex
      .from('shopping_list')
      .where({ id })
      .delete()
      .returning('*')
      /* .then(result => {
        console.log(result)
        return result
      }) */
      .then(deletedItem => {
        const item = deletedItem[0];
        return { ...item, price: Number(item.price) }
      })
      // [NOTE] This is the original version created, but in order to use the database delete() method, the other is used instead
      // .select('*')
      // .then(listItems => {
      //   const itemToDeleteIndex = listItems.findIndex(itemToDelete => itemToDelete.id === id);
      //   listItems.splice(itemToDeleteIndex, 1);
      //   // const deletedItem = listItems.splice(itemToDeleteIndex, 1); // for use in case of need to compare what's been deleted
      //   return listItems.map(row => {
      //     return { ...row, price: Number(row.price) }
      //   })
      // })
  }
};

module.exports = ShoppingListService;
