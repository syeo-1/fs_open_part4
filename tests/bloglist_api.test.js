const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const { initialNotes } = require('./test_helper')

const api = supertest(app)

test('blogs are returned as json', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('there are two blogs', async() => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})
test('a blog is added to the blog list', async() => {
  const newBlog = {
    title: 'testblog',
    author: 'me',
    url: 'http://localhost:3003/api/blogs',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialNotes.length+1)
})

afterAll(() => {
  mongoose.connection.close()
})