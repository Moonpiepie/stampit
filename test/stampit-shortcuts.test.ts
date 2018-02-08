import _ from 'lodash';
import stampit from "../src/stampit"

// stampit.methods, stampit.init, stampit.props, etc.

test('stampit.methods shortcut', () => {
  const methods = {method1() {}};
  const stamp1 = stampit({methods: methods});
  const stamp2 = stampit.methods(methods);

  expect(_.toPlainObject(stamp1.compose)).toEqual(_.toPlainObject(stamp2.compose));
});

test('stampit.init shortcut', () => {
  const init = () => {};
  const stamp1 = stampit({init: init});
  const stamp2 = stampit.init(init);

  expect(_.toPlainObject(stamp1.compose)).toEqual(_.toPlainObject(stamp2.compose));
});

test('stampit.composers shortcut', () => {
  const composer = () => {};
  const stamp1 = stampit({composers: composer});
  const stamp2 = stampit.composers(composer);

  expect(_.toPlainObject(stamp1.compose)).toEqual(_.toPlainObject(stamp2.compose));
});

test('stampit.props shortcut', () => {
  const props = {method1() {}};
  const stamp1 = stampit({props: props});
  const stamp2 = stampit.props(props);

  expect(_.toPlainObject(stamp1.compose)).toEqual(_.toPlainObject(stamp2.compose));
});

test('stampit.statics shortcut', () => {
  const statics = {method1() {}};
  const stamp1 = stampit({statics: statics});
  const stamp2 = stampit.statics(statics);

  expect(_.toPlainObject(stamp1.compose)).toEqual(_.toPlainObject(stamp2.compose));
});

test('stampit.statics(arg1, arg2) shortcut', () => {
  const stamp1 = stampit.statics({foo: 1}, {bar: '2'});

  expect(stamp1.foo).toBeTruthy();
  expect(stamp1.bar).toBeTruthy();
});

test('stampit.propertyDescriptors shortcut', () => {
  const propertyDescriptors = {x: {writable: true}};
  const stamp1 = stampit({propertyDescriptors: propertyDescriptors});
  const stamp2 = stampit.propertyDescriptors(propertyDescriptors);

  expect(_.toPlainObject(stamp1.compose)).toEqual(_.toPlainObject(stamp2.compose));
});

test('stampit.staticPropertyDescriptors shortcut', () => {
  const staticPropertyDescriptors = {x: {writable: true}};
  const stamp1 = stampit({staticPropertyDescriptors: staticPropertyDescriptors});
  const stamp2 = stampit.staticPropertyDescriptors(staticPropertyDescriptors);

  expect(_.toPlainObject(stamp1.compose)).toEqual(_.toPlainObject(stamp2.compose));
});

test('all shortcuts combined', () => {
  const {compose, methods, init} = stampit;
  const HasFoo = compose({
    properties: {
      foo: 'default foo!'
    }
  }).methods().properties().initializers().deepProperties()
    .staticProperties().staticDeepProperties()
    .configuration().deepConfiguration()
    .propertyDescriptors().staticPropertyDescriptors()
    .props().init().composers().deepProps()
    .statics().deepStatics().conf().deepConf();

  const PrintFoo = methods({
    printFoo() {
      // console.log(this.foo || 'There is no foo');
    }
  }).methods().properties().initializers().deepProperties()
    .staticProperties().staticDeepProperties()
    .configuration().deepConfiguration()
    .propertyDescriptors().staticPropertyDescriptors()
    .props().init().composers().deepProps()
    .statics().deepStatics().conf().deepConf();

  const Init = init(function ({foo}) {
    this.foo = foo;
  }).methods().properties().initializers().deepProperties()
    .staticProperties().staticDeepProperties()
    .configuration().deepConfiguration()
    .propertyDescriptors().staticPropertyDescriptors()
    .props().init().composers().deepProps()
    .statics().deepStatics().conf().deepConf();

  const Foo = compose(HasFoo, PrintFoo, Init);

  expect(Foo.compose.properties.foo).toBe('default foo!');
  expect(typeof Foo.compose.methods.printFoo === 'function').toBeTruthy();
  expect(Foo.compose.initializers.length).toBe(1);
});
