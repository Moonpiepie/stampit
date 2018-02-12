import stampit from '../src/stampit'

test('stamp.compose() deep merge bad deepProps', () => {
  const stamp: any = stampit({ props: { a: 1 } })
  stamp.compose = null
  const o = stamp()

  expect(o.a).toBe(undefined)
})
