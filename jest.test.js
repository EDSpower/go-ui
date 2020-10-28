test('i am jest', () => {
  expect( 2 + 2 ).toBe(4) 
  expect( 2 + 2 ).not.toBe(6) 
})

test('test to be true or flase', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test number' , () => {
  expect(2).toBeLessThan(4)
  expect(6).toBeGreaterThan(5)
})

test('test object', () => {
  expect({name: 'xiu'}).toEqual({name: 'xiu'})
})