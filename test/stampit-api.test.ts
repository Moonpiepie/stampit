import stampit from '../src/stampit';

function isFunction(obj: any) {
  return typeof obj === 'function';
}

function isStamp(obj: any) {
  return isFunction(obj) && isFunction(obj.compose);
}


// Main API

test('stampit()', () => {
  expect(typeof stampit()).toBe('function');
});

test('stampit({})', () => {
  expect(isStamp(stampit({}))).toBeTruthy();
});

test('incorrect stampit({ methods }) args', () => {
  expect(stampit({methods: 42}).compose.methods).toEqual(undefined);
  expect(stampit({methods: null}).compose.methods).toEqual(undefined);
  expect(stampit({methods: 'a string'}).compose.methods).toEqual(undefined);
});

test('incorrect stampit({ props }) args', () => {
  expect(stampit({props: 42}).compose.properties).toEqual(undefined);
  expect(stampit({props: null}).compose.properties).toEqual(undefined);
});

test('incorrect stampit({ init }) args', () => {
  expect(stampit({init: 42}).compose.initializers).toEqual(undefined);
  expect(stampit({init: null}).compose.initializers).toEqual(undefined);
  expect(stampit({init: [undefined]}).compose.initializers).toEqual(undefined);
  expect(stampit({init: new RegExp('')}).compose.initializers).toEqual(undefined);
  expect(stampit({init: [42]}).compose.initializers).toEqual(undefined);
  expect(stampit({init: 'a string'}).compose.initializers).toEqual(undefined);
});

test('incorrect stampit({ deepProps }) args', () => {
  expect(stampit({deepProps: 42}).compose.deepProperties).toEqual(undefined);
  expect(stampit({deepProps: null}).compose.deepProperties).toEqual(undefined);
});

test('multiple arguments stampit(arg1, arg2, ...)', () => {
  expect(stampit(null, {
    init() {
      // empty
    }
  }).compose.initializers.length).toBe(1);
  expect(stampit(null, {props: {x: 2}}).compose.properties.x).toBe(2);
  expect(stampit(null, {deepProps: {x: 2}}).compose.deepProperties.x).toBe(2);
  expect(stampit(null, {statics: {x: 2}}).compose.staticProperties.x).toBe(2);
  expect(stampit(null, {conf: {x: 2}}).compose.configuration.x).toBe(2);
  expect(stampit(null, {deepConf: {x: 2}}).compose.deepConfiguration.x).toBe(2);
  expect(stampit(
    null,
    {
      propertyDescriptors: {
        x: {
          writable: true
        }
      }
    }
  ).compose.propertyDescriptors).toEqual({x: {writable: true}});
  expect(stampit(
    null,
    {staticPropertyDescriptors: {x: {writable: true}}}
  ).compose.staticPropertyDescriptors).toEqual({x: {writable: true}});
});

test('test propertyDescriptors', () => {
  const obj = stampit(
    null,
    {
      propertyDescriptors: {
        'property1': {
          value: true,
          writable: true
        },
        'property2': {
          value: 'Hello',
          writable: false
        }
      }
    }
  ).create();

  expect(obj.property1).toBeTruthy();
  obj.property1 = false;
  expect(obj.property1).toBeFalsy();

  expect(obj.property2).toBe('Hello');
  expect(() => {
    obj.property2 = 'World';
  }).toThrow(TypeError);
});
