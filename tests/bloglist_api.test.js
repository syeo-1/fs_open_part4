const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testHelper = require('./test_helper')
// const initialBlogs = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async() => {
  await Blog.deleteMany({})

  // let blogObject = new Blog(testHelper.initialBlogs[0])
  // await blogObject.save()

  // blogObject = new Blog(testHelper.initialBlogs[1])
  // await blogObject.save()
  const blogObjects = testHelper.initialBlogs
    .map(blog => new Blog(blog)) 
  
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})

describe('when there are already some blogs', () => {
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
})

describe('adding a new blog', () => {
  test('succeed with valid blog', async() => {
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

    expect(response.body).toHaveLength(testHelper.initialBlogs.length+1)
  })
})

describe('deleting a single blog', () => {
  test('succeed with 204 status code if id is valid', async() => {
    const startingBlogs = await testHelper.blogsInDB()
    // console.log(startingBlogs)
    const blogToDelete = startingBlogs[0]
    // console.log(blogToDelete.id)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    // await console.log(testHelper.blogsInDB())

    const endingBlogs = await testHelper.blogsInDB()

    expect(endingBlogs).toHaveLength(testHelper.initialBlogs.length-1)
    // console.log(endingBlogs)
    const contents = endingBlogs.map(r => r.title)
    // console.log(contents)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})