import stampit from '../src/stampit'

// Closure arguments

test('stamp.init() arguments are passed', () => {
  let initStamp
  const outerStamp = stampit().init((options: any, { instance, stamp, args }: any) => {
    expect(instance).toBeTruthy()
    expect(typeof instance).toBe('object')
    expect(stamp).toBeTruthy()
    expect(typeof stamp).toBe('function')
    expect(args).toBeTruthy()
    expect(Array.isArray(args)).toBeTruthy()
    initStamp = stamp
  })

  outerStamp()

  expect(outerStamp).toBe(initStamp)
})

test('stamp.init() should assign `this` to `{ instance }`', () => {
  const stamp = stampit().init(function(this: any, options: any, { instance }: any) {
    expect(instance === this).toBeTruthy()
  })

  stamp()
})

test('stamp.init() should assign stamp to `{ stamp }`', () => {
  const outerStamp = stampit().init((options: any, { stamp }: any) => {
    expect(outerStamp === stamp).toBeTruthy()
  })

  outerStamp()
})

test('stamp.init() should assign arguments to `{ args }`', () => {
  const stamp = stampit().init((options: any, { args }: any) => {
    expect(args[0]).toBe('arg1')
    expect(args[1]).toBe(undefined)
    expect(args[2]).toBe('arg3')
  })

  stamp('arg1', undefined, 'arg3')
})

test('stamp.init() can handle multiple init functions', () => {
  let init1
  let init2
  let init3

  const stamp = stampit()
    .init(() => {
      init1 = true
    })
    .init(() => {
      init2 = true
    })
    .init(() => {
      init3 = true
    })

  stamp()

  expect(init1).toBeTruthy()
  expect(init2).toBeTruthy()
  expect(init3).toBeTruthy()
})

test('stamp.init() can handle multiple init functions assigned with array', () => {
  let init1
  let init2
  let init3

  const stamp = stampit().init([
    () => {
      init1 = true
    },
    () => {
      init2 = true
    },
    () => {
      init3 = true
    }
  ])

  stamp()

  expect(init1).toBeTruthy()
  expect(init2).toBeTruthy()
  expect(init3).toBeTruthy()
})

test('stamp.init() should call composed init functions in order', () => {
  const result: any = []

  const stamp = stampit()
    .init(() => {
      result.push('a')
    })
    .init(() => {
      result.push('b')
    })
    .init(() => {
      result.push('c')
    })

  const stamp2 = stampit().init([
    () => {
      result.push('d')
    },
    () => {
      result.push('e')
    }
  ])

  const stamp3 = stampit.compose(stamp, stamp2)

  stamp3()
  expect(result).toEqual(['a', 'b', 'c', 'd', 'e'])
})

test('explicit push wrong object to stamp.compose.initializers[]', () => {
  const stamp: any = stampit({
    init() {
      const secret = 'foo'
      this.getSecret = () => {
        return secret
      }
    }
  })

  stamp.compose.initializers.push(42) // breaking the stamp.
  const obj = stamp()

  expect(obj.getSecret()).toBe('foo')
})

test('stamp.compose.initializers malformed object', () => {
  const stamp = stampit.props({ ref: 42 }).init(function(this: any) {
    const secret = 'foo'
    this.getSecret = () => {
      return secret
    }
  })

  stamp.compose.initializers = 42 // breaking the stamp badly
  const obj = stamp()

  expect(obj.ref).toBeTruthy()
})

test('changing second arg is not propagaded', () => {
  const stamp = stampit()
    .init((opts: any, arg2: any) => {
      arg2.instance = null
      arg2.stamp = null
      arg2.args = null
    })
    .init((opts: any, arg2: any) => {
      expect(arg2.instance).not.toBe(null)
      expect(arg2.stamp).not.toBe(null)
      expect(arg2.args).not.toBe(null)
    })

  stamp()
})
