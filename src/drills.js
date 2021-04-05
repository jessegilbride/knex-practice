const knex = require('knex');
require('dotenv').config();

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function getItemsWithText(searchTerm) {
  if (typeof(searchTerm) !== 'string') return console.log('>> WARNING >> please enter a string for the search.');
  knexInstance
    .select('id', `name`, `price`, `date_added`, `checked`, 'category')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(results => {
      console.log(results);
    })
}
// getItemsWithText('turnip');

function getItemsPaginated(pageNumber) {
  if (typeof(pageNumber) !== 'number') return console.log('>> WARNING >> please enter a page number.');
  const productsPerPage = 6;
  const offset = productsPerPage * (pageNumber - 1);
  knexInstance
  .select('id', `name`, `price`, `date_added`, `checked`, 'category')
  .from('shopping_list')
  .limit(productsPerPage)
  .offset(offset)
  .then(results => {
    if (results.length === 0) return console.log('>> NOTICE >> there are no results to show.');
    console.log(results)
  })
}
// getItemsPaginated(3);

function getItemsAddedSince(days) {
  if (typeof(days) !== 'number') return console.log('>> WARNING >> please enter a number.');
  const daysAgo = days + 2; // not sure why this needs an offset
  knexInstance
  .select('id', `name`, `price`, `date_added`, `checked`, 'category')
  // .count('date_added')
  .from('shopping_list')
  .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
  .then(results => console.log(results))
}
// getItemsAddedSince(11);

// show the total price for each category
function getCostForCategory() {
  knexInstance
  .select('category')
  .count('price AS total')
  .from('shopping_list')
  .groupBy('category')
  .then(results => console.log(results))
}
getCostForCategory();