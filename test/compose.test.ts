import stampit from '../src/stampit';

// Compose

test('stampit().compose()', () => {
  let closuresCalled = 0;
  const a = stampit({
    methods: {
      method() {
        return false;
      }
    },
    init() {
      closuresCalled += 1;
    },
    props: {prop: false}
  });
  const b = stampit({
    methods: {
      method() {
        return true;
      }
    },
    init() {
      closuresCalled += 1;
    },
    props: {prop: true}
  });
  const d = a.compose(b).create();

  expect(d.method() && d.prop).toBeTruthy();
  expect(closuresCalled).toBe(2);
});

test('stampit.compose()', () => {
  const a = stampit({
    methods: {
      methodA() {
        return true;
      }
    },
    init() {
      const secret = 'a';
      this.getA = () => {
        return secret;
      };
    },
    props: {propA: '1'}
  });
  const b = stampit({
    methods: {
      methodB() {
        return true;
      }
    },
    init() {
      const secret = true;
      this.getB = () => {
        return secret;
      };
    },
    props: {propB: '1'}
  });
  const c = stampit({
    methods: {
      methodC() {
        return true;
      }
    },
    init() {
      const secret = true;
      this.getC = () => {
        return secret;
      };
    },
    props: {propC: '1'}
  });
  const d = stampit.compose(a, b, c).create();

  expect(d.methodA && d.getA && d.propA &&
    d.methodB && d.getB && d.propB &&
    d.methodC && d.getC && d.propC).toBeTruthy();
});

test('stampit().compose() with extended descriptors', () => {
  const stamp = stampit().compose({
    props: {a: 1},
    init() {
    },
    deepProps: {a: 1},
    statics: {a: 1},
    deepStatics: {a: 1},
    conf: {a: 1},
    deepConf: {a: 1}
  });
  const d = stamp.compose;

  expect(d.properties).toEqual({a: 1});
  expect(d.deepProperties).toEqual({a: 1});
  expect(d.staticProperties.a).toBe(1);
  expect(d.staticDeepProperties).toEqual({a: 1});
  expect(d.configuration).toEqual({a: 1});
  expect(d.deepConfiguration).toEqual({a: 1});
  expect(d.initializers.length === 1 && typeof d.initializers[0] === 'function').toBeTruthy();
});

test('stampit().compose() with extended stamps', () => {
  const stamp = stampit().compose({
    props: {a: 1},
    init() {
    },
    deepProps: {a: 1},
    statics: {a: 1},
    deepStatics: {a: 1},
    conf: {a: 1},
    deepConf: {a: 1}
  });
  const d = stampit().compose(stamp).compose;

  expect(d.properties).toEqual({a: 1});
  expect(d.deepProperties).toEqual({a: 1});
  expect(d.staticProperties.a).toBe(1);
  expect(d.staticDeepProperties).toEqual({a: 1});
  expect(d.configuration).toEqual({a: 1});
  expect(d.deepConfiguration).toEqual({a: 1});
  expect(d.initializers.length === 1 && typeof d.initializers[0] === 'function').toBeTruthy();
});

test('stampit().compose() with extended stamps and descriptors', () => {
  const stamp1 = stampit({
    props: {a: 1}
  });
  const stamp2 = stampit().compose({
    props: {b: 1}
  });
  const descriptor1 = {
    init() {
    }
  };
  const descriptor2 = {
    deepProps: {a: 1},
    statics: {a: 1},
    deepStatics: {a: 1},
    conf: {a: 1},
    deepConf: {a: 1}
  };
  const d = stampit().compose(stamp1, descriptor1, stamp2, descriptor2).compose;

  expect(d.properties).toEqual({a: 1, b: 1});
  expect(d.deepProperties).toEqual({a: 1});
  expect(d.staticProperties.a).toBe(1);
  expect(d.staticDeepProperties).toEqual({a: 1});
  expect(d.configuration).toEqual({a: 1});
  expect(d.deepConfiguration).toEqual({a: 1});
  expect(d.initializers.length === 1 && typeof d.initializers[0] === 'function').toBeTruthy();
});
