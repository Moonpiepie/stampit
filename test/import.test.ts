'use strict';
/* eslint-disable */
import stampit from '../src/stampit';

test('infection works using the require("src/stampit")', () => {
  const obj = stampit.init(function (this: any) {
    'use strict';
    const secret = 'foo';
    this.getSecret = () => {
      return secret;
    };
  }).methods({
    foo() {
      return 'foo';
    }
  }).create();

  expect(obj.getSecret()).toBe('foo');
  expect(obj.foo() === 'foo').toBeTruthy();
});
