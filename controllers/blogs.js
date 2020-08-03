const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
// const { nonExistentID } = require('../tests/test_helper')
// const { response } = require('express')

blogsRouter.get('/', async(request, response) => {
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
})

blogsRouter.delete('/:id', async(request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async(request, response, next) => {
  try {
    const blog = request.body
    await Blog.findByIdAndUpdate(request.params.id, blog)
    response.json(blog)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter