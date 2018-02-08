import stampit from '../src/stampit';

// Basics Methods

test('stampit({ methods })', () => {
  const obj = stampit({
    methods: {
      foo() {
        return 'foo';
      }
    }
  }).create();

  expect(obj.foo() && !obj.hasOwnProperty('foo')).toBeTruthy();
});

test('stampit().methods()', () => {
  const obj = stampit().methods({
    foo() {
      return 'foo';
    },
    methodOverride() {
      return false;
    },
    prop1: 1
  }).methods({
    bar() {
      return 'bar';
    },
    methodOverride() {
      return true;
    },
    prop2: 2
  }).create();

  expect(obj.foo() && !obj.hasOwnProperty('foo')).toBeTruthy();
  expect(obj.bar() && !obj.hasOwnProperty('bar')).toBeTruthy();
  expect(obj.methodOverride() && !obj.hasOwnProperty('methodOverride')).toBeTruthy();
  expect(obj.prop1 && !obj.hasOwnProperty('prop1')).toBeTruthy();
  expect(obj.prop2 && !obj.hasOwnProperty('prop1')).toBeTruthy();
});

test('stampit({ methods }).methods()', () => {
  const obj = stampit({
    methods: {
      foo() {
        return 'foo';
      },
      methodOverride() {
        return false;
      },
      prop1: 1
    }
  }).methods({
    bar() {
      return 'bar';
    },
    methodOverride() {
      return true;
    },
    prop2: 2
  }).create();

  expect(obj.foo() && !obj.hasOwnProperty('foo')).toBeTruthy();
  expect(obj.bar() && !obj.hasOwnProperty('bar')).toBeTruthy();
  expect(obj.methodOverride() && !obj.hasOwnProperty('methodOverride')).toBeTruthy();
  expect(obj.prop1 && !obj.hasOwnProperty('prop1')).toBeTruthy();
  expect(obj.prop2 && !obj.hasOwnProperty('prop1')).toBeTruthy();
});

test('stampit().methods(a, b)', () => {
  const obj = stampit().methods({
    a() {
      return 'a';
    }
  }, {
    b() {
      return 'b';
    }
  }).create();

  expect(obj.a() === 'a' && obj.b() === 'b').toBeTruthy();
});
