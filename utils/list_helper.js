const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (accumulator, current) => {
    console.log(accumulator)
    return accumulator + current.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
}