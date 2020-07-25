const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
    
  const result = listHelper.dummy(blogs)
  console.log(result)
  expect(result).toBe(1)
})