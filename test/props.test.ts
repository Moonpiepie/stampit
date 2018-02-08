import stampit from '../src/stampit';

// props shallow mixing

test('Stamp props shallow copied for object created', () => {
  const deep = {foo: 'foo', bar: 'bar'};
  const stamp1 = stampit().props({deep: deep, foo: 'foo'});
  const stamp2 = stampit({props: {deep: deep, foo: 'foo'}});

  const o1 = stamp1();
  const o2 = stamp2();
  o1.deep.foo = 'another value';
  expect(o1.foo).toBe(o2.foo);
  expect(o1.deep).toBe(o2.deep);
  expect(o1.deep.foo).toBe(o2.deep.foo);
});

test('stampit.props(props) shallow copied into stamp', () => {
  const stamp = stampit()
    .props({deep: {foo: '1', bar: '1'}, foo: '1', bar: '1'})
    .props({deep: {foo: 'override', baz: 'baz'}, foo: 'override', baz: 'baz'});
  const o = stamp();

  expect(o.foo).toBe('override');
  expect(o.bar).toBe('1');
  expect(o.baz).toBe('baz');
  expect(o.deep.foo).toBe('override');
  expect(o.deep.bar).toBe(undefined);
  expect(o.deep.baz).toBe('baz');
});

test('stamp.compose() shallow copy props', () => {
  const stamp = stampit({
    props: {
      deep: {foo: '1', bar: '1'},
      foo: '1',
      bar: '1'
    }
  })
    .compose(stampit({
      props: {
        deep: {foo: 'override', baz: 'baz'},
        foo: 'override',
        baz: 'baz'
      }
    }));
  const o = stamp();

  expect(o.foo).toBe('override');
  expect(o.bar).toBe('1');
  expect(o.baz).toBe('baz');
  expect(o.deep.foo).toBe('override');
  expect(o.deep.bar).toBe(undefined);
  expect(o.deep.baz).toBe('baz');
});
