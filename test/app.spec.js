const app = require('../src/app');

// describe('App', () => {
//   it('GET / responds with a status:200 containing the words "Hello, world!"', () => {
//     return supertest(app).get('/').expect(200, 'Hello, world!');
//   })
// })

describe('App', () => {
  it('GET / responds with a status:200 containing the words "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!')
  })
})