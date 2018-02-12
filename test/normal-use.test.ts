import stampit from '../src/stampit'

test('use it', () => {
  const stamp1 = stampit({
    methods: {
      boo() {
        console.log('boo')
      }
    }
  })

  // console.log(stamp1)
  expect(stamp1.methods).toBeTruthy()
  // stamp1.
})
