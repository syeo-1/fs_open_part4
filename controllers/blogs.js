const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const { response } = require('express')

blogsRouter.get('/', async(request, response) => {
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.json(savedBlog)
  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
})

module.exports = blogsRouter