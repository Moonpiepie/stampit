import stampit from '../src/stampit';

// Props safety

test('Stamp deepProps deep cloned for object created', () => {
  const deep = {foo: 'foo', bar: 'bar'};
  const stamp1 = stampit().deepProps({deep: deep, baz: 'baz'});
  const stamp2 = stampit({deepProps: {deep: deep, baz: 'baz'}});

  let o1 = stamp1();
  let o2 = stamp1();
  o1.baz = 'another value';
  expect(o1.baz).not.toBe(o2.baz);
  o1.deep.foo = 'another value';
  expect(o1.deep.foo).not.toBe(o2.deep.foo);

  o1 = stamp2();
  o2 = stamp2();
  o1.baz = 'another value';
  expect(o1.baz).not.toBe(o2.baz);
  o1.deep.foo = 'another value';
  expect(o1.deep.foo).not.toBe(o2.deep.foo);
});

test('stampit.deepProps(deepProps) deep merge into stamp', () => {
  const stamp = stampit()
    .deepProps({deep: {foo: 'foo', bar: 'bar'}, foo: 'foo', bar: 'bar'})
    .deepProps({
      deep: {foo: 'override', baz: 'baz'},
      foo: 'override',
      baz: 'baz'
    });
  const o = stamp();

  expect(o.foo).toBe('override');
  expect(o.bar).toBe('bar');
  expect(o.baz).toBe('baz');
  expect(o.deep.foo).toBe('override');
  expect(o.deep.bar).toBe('bar');
  expect(o.deep.baz).toBe('baz');
});

test('stamp.compose() deep merge deepProps', () => {
  const stamp = stampit({
    deepProps: {
      deep: {foo: 'foo', bar: 'bar', NULL: null, ZERO: 0},
      foo: 'foo',
      bar: 'bar'
    }
  })
    .compose(stampit({
      deepProps: {
        deep: {foo: 'override', baz: 'baz', NULL: 'STRING', ZERO: 'STRING'},
        foo: 'override',
        baz: 'baz'
      }
    }));
  const o = stamp();

  expect(o.foo).toBe('override');
  expect(o.bar).toBe('bar');
  expect(o.baz).toBe('baz');
  expect(o.deep.foo).toBe('override');
  expect(o.deep.bar).toBe('bar');
  expect(o.deep.baz).toBe('baz');
  expect(o.deep.NULL).toBe('STRING');
  expect(o.deep.ZERO).toBe('STRING');
});

test('stamp.compose() deep merge bad deepProps', () => {
  const stamp = stampit.compose({
    deepProperties: null,
  }, {
    deepProps: {
      deep: {foo: 'override', baz: 'baz', NULL: 'STRING', ZERO: 'STRING'},
      foo: 'override',
      baz: 'baz'
    }
  });
  const o = stamp();

  expect(o.foo).toBe('override');
  expect(o.baz).toBe('baz');
  expect(o.deep.foo).toBe('override');
  expect(o.deep.baz).toBe('baz');
  expect(o.deep.NULL).toBe('STRING');
  expect(o.deep.ZERO).toBe('STRING');
});
