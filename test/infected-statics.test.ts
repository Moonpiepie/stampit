import _ from 'lodash';
import stampit from '../src/stampit';

test('stampit().methods static method', () => {
  const methods = {
    method1() {
    }
  };
  const stamp1 = stampit({methods: methods});
  const stamp2 = stampit().methods(methods);

  expect(_.toPlainObject(stamp1.compose)).toEqual(_.toPlainObject(stamp2.compose));
});

test('stampit().init static method', () => {
  const init = {
    method1() {
    }
  };
  const stamp1 = stampit({init: init});
  const stamp2 = stampit().init(init);

  expect(_.toPlainObject(stamp1.compose)).toEqual(_.toPlainObject(stamp2.compose));
});

test('stampit().props static method', () => {
  const props = {
    method1() {
    }
  };
  const stamp1 = stampit({props: props});
  const stamp2 = stampit().props(props);

  expect(_.toPlainObject(stamp1.compose)).toEqual(_.toPlainObject(stamp2.compose));
});

test('stampit().statics static method', () => {
  const statics = {
    method1() {
    }
  };
  const stamp1 = stampit({statics: statics});
  const stamp2 = stampit().statics(statics);

  expect(_.toPlainObject(stamp1.compose)).toEqual(_.toPlainObject(stamp2.compose));
});

test('stampit().propertyDescriptors static method', () => {
  const propertyDescriptors = {x: {writable: true}};
  const stamp1 = stampit({propertyDescriptors: propertyDescriptors});
  const stamp2 = stampit().propertyDescriptors(propertyDescriptors);

  expect(_.toPlainObject(stamp1.compose)).toEqual(_.toPlainObject(stamp2.compose));
});

test('stampit().staticPropertyDescriptors static method', () => {
  const staticPropertyDescriptors = {x: {writable: true}};
  const stamp1 = stampit({staticPropertyDescriptors: staticPropertyDescriptors});
  const stamp2 = stampit().staticPropertyDescriptors(staticPropertyDescriptors);

  expect(_.toPlainObject(stamp1.compose)).toEqual(_.toPlainObject(stamp2.compose));
});

test('stampit() can be infected', () => {
  let counter = 0;
  const infectedStampit = function (...args) {
    counter += 1;
    args.push({
      staticProperties: {
        compose: infectedStampit
      }
    });

    return stampit.apply(this, args);
  };

  const stamp = infectedStampit({props: {a: 1}}) // 1
    .compose({deepProps: {b: 2}}) // 2
    .methods({c: 3}) // 3
    .compose( // 4
      infectedStampit({conf: {d: 4}}) // 5
    );

  expect(counter).toBe(5);
  expect(stamp.compose.properties.a).toBe(1);
  expect(stamp.compose.deepProperties.b).toBe(2);
  expect(stamp.compose.methods.c).toBe(3);
  expect(stamp.compose.configuration.d).toBe(4);
});
