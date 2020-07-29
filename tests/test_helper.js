const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'Slush: Probably the best conference in the world',
    'author': 'FundingBox',
    'url': 'https://medium.com/fundingbox-blog/slush-probably-the-best-conference-in-the-world-42329215c612',
    'likes': 10,
  },
  {
    'title': '2020 technology industry outlook',
    'author': 'Deloitte',
    'url': 'https://www2.deloitte.com/us/en/pages/technology-media-and-telecommunications/articles/technology-industry-outlook.html',
    'likes': 100
  }
]

const blogsInDB = async() => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistentID = async() => {
  const blog = new Blog({content: 'some text'})

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}
module.exports = {
  initialBlogs,
  blogsInDB,
  nonExistentID
}