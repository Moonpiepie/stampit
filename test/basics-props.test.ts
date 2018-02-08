import stampit from '../src/stampit';

// Basics Props

test('stampit({ props })', () => {
  const obj = stampit({props: {foo: {bar: 'bar'}}}).create();

  expect(obj.foo.bar).toBe('bar');
});

test('stampit().props()', () => {
  const obj = stampit().props({
    foo: {bar: 'bar'},
    propsOverride: false,
    func1() {
    }
  }).props({
    bar: 'bar',
    propsOverride: true,
    func2() {
    }
  }).create();

  expect(obj.foo.bar).toBe('bar');
  expect(obj.bar).toBe('bar');
  expect(obj.propsOverride).toBeTruthy();
  expect(obj.func1).toBeTruthy();
  expect(obj.func2).toBeTruthy();
});

test('stampit({ props }).props()', () => {
  const obj = stampit({
    props: {
      foo: {bar: 'bar'},
      propsOverride: false,
      func1() {
      }
    }
  }).props({
    bar: 'bar',
    propsOverride: true,
    func2() {
    }
  }).create();

  expect(obj.foo.bar).toBe('bar');
  expect(obj.bar).toBe('bar');
  expect(obj.propsOverride).toBeTruthy();
  expect(obj.func1).toBeTruthy();
  expect(obj.func2).toBeTruthy();
});

test('stampit().props(a, b)', () => {
  const obj = stampit().props({
    a: 'a'
  }, {
    b: 'b'
  }).create();

  expect(obj.a && obj.b).toBeTruthy();
});
