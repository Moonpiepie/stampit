/* eslint-disable */
const stampit1 = require("../src/stampit")

test('import is the same as require', () => {
  const stampit2 = require("../src/stampit")

  expect(stampit1).toBe(stampit2);
});

test('infection works using the require("src/stampit")', () => {
  const obj = require('../src/stampit')
    .init(function () {
      const secret = 'foo';
      this.getSecret = () => {
        return secret;
      };
    })
    .methods({
      foo() {
        return 'foo';
      }
    })
    .create();

  expect(obj.getSecret()).toBe('foo');
  expect(obj.foo() === 'foo').toBeTruthy();
});
