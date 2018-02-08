import stampit from '../src/stampit';

// Immutability

test('Basic stamp immutability', () => {
  const methods = {
    f() {
    }
  };
  const props = {s: {deep: 1}};
  const deepProps = {p: {deep: 1}};
  const init = () => {
  };
  const stamp1 = stampit({methods, props, deepProps, init});

  methods.f = () => {
  };
  props.s.deep = 2;
  deepProps.p.deep = 2;
  const stamp2 = stampit({methods, props, deepProps, init});

  expect(stamp1.compose.methods).not.toBe(stamp2.compose.methods);
  expect(stamp1.compose.methods.f).not.toBe(stamp2.compose.methods.f);
  expect(stamp1.compose.properties).not.toBe(stamp2.compose.properties);
  expect(stamp1.compose.properties.s).toBe(stamp2.compose.properties.s);
  expect(stamp1.compose.properties.s.deep).toBe(stamp2.compose.properties.s.deep);
  expect(stamp1.compose.deepProperties).not.toBe(stamp2.compose.properties);
  expect(stamp1.compose.deepProperties.p).not.toBe(stamp2.compose.deepProperties.p);
  expect(stamp1.compose.deepProperties.p.deep).not.toBe(stamp2.compose.deepProperties.p.deep);
  expect(stamp1.compose.initializers).not.toBe(stamp2.compose.initializers);
});

test('Stamp immutability made of same source', () => {
  const methods = {
    f() {
    }
  };
  const props = {s: {deep: 1}};
  const deepProps = {p: {deep: 1}};
  const init = () => {
  };
  const stamp1 = stampit({methods, props, deepProps, init});
  const stamp2 = stampit({methods, props, deepProps, init});

  expect(stamp1.compose.methods).not.toBe(stamp2.compose.methods);
  expect(stamp1.compose.properties).not.toBe(stamp2.compose.properties);
  expect(stamp1.compose.properties.s).toBe(stamp2.compose.properties.s);
  expect(stamp1.compose.deepProperties).not.toBe(stamp2.compose.deepProperties);
  expect(stamp1.compose.deepProperties.p).not.toBe(stamp2.compose.deepProperties.p);
  expect(stamp1.compose.initializers).not.toBe(stamp2.compose.initializers);
});

test('Basic object immutability', () => {
  const methods = {
    f() {
    }
  };
  const props = {s: {deep: 1}};
  const deepProps = {p: {deep: 1}};
  const o1 = stampit({methods, props, deepProps})();

  methods.f = () => {
  };
  props.s.deep = 2;
  deepProps.p.deep = 2;
  const o2 = stampit({methods, props, deepProps})();

  expect(o1).not.toBe(o2);
  expect(o1.f).not.toBe(o2.f);
  expect(o1.s).toBe(o2.s);
  expect(o1.s.deep).toBe(o2.s.deep);
  expect(o1.p).not.toBe(o2.p);
  expect(o1.p.deep).not.toBe(o2.p.deep);
});

test('Stamp chaining functions immutability', () => {
  const stamp1 = stampit();
  const stamp2 = stamp1.methods({
    f() {
    }
  });
  const stamp3 = stamp2.properties({s: {deep: 1}});
  const stamp4 = stamp3.init(() => {
  });
  const stamp5 = stamp2.deepProperties({p: {deep: 1}});
  const stamp6 = stamp4.compose(stampit());

  expect(stamp1).not.toBe(stamp2);
  expect(stamp2).not.toBe(stamp3);
  expect(stamp3).not.toBe(stamp4);
  expect(stamp4).not.toBe(stamp5);
  expect(stamp5).not.toBe(stamp6);
});
