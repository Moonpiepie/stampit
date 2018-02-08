import stampit from '../src/stampit';

// Basics statics

test('stampit().statics()', () => {
  const stamp1 = stampit()
    .statics({
      foo() {
        return 42;
      },
      bar: 'space'
    });

  expect(stamp1.foo).toBeTruthy();
  expect(stamp1.foo()).toBe(42);
  expect(stamp1.bar).toBe('space');
});

test('stampit({statics})', () => {
  const stamp1 = stampit({
    statics: {
      foo: 42
    }
  });

  expect(stamp1.foo).toBe(42);
});

test('stampit().statics() last override', () => {
  const stamp1 = stampit()
    .statics({
      foo() {
        return 'override';
      }
    });

  const stamp2 = stampit()
    .statics({
      foo() {
      }
    }).compose(stamp1);

  expect(stamp2.foo()).toBe('override');
});

test('stampit().statics(arg1, arg2)', () => {
  const stamp1 = stampit().statics(
    {
      foo1() {
      }
    },
    {
      foo2() {
      }
    }
  );

  expect(stamp1.foo1).toBeTruthy();
  expect(stamp1.foo2).toBeTruthy();
});

test('stampit.statics(arg1, arg2)', () => {
  const stamp1 = stampit.statics(
    {
      foo1() {
      }
    },
    {
      foo2() {
      }
    }
  );

  expect(stamp1.foo1).toBeTruthy();
  expect(stamp1.foo2).toBeTruthy();
});

test('stampit({statics}).statics()', () => {
  const stamp1 = stampit({
    statics: {
      foo1: 'foo1 value'
    }
  })
    .statics({
      foo2() {
        return 'foo2 value';
      }
    });

  expect(stamp1.foo1).toBe('foo1 value');
  expect(stamp1.foo2()).toBe('foo2 value');
});
