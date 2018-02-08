import stampit from '../src/stampit';

// Basics Enclose

test('stampit({ init })', () => {
  const obj = stampit({
    init() {
      const secret = 'foo';
      this.getSecret = () => {
        return secret;
      };
    }
  }).create();

  expect(obj.getSecret()).toBe('foo');
});

test('stampit().init()', () => {
  const obj = stampit().init(function () {
    const secret = 'foo';
    this.getSecret = () => {
      return secret;
    };
  }).init(function () {
    this.a = 'a';
  }).create();

  expect(obj.getSecret()).toBe('foo');
  expect(obj.a).toBeTruthy();
});

test('stampit({ init }).init()', () => {
  const obj = stampit({
    init() {
      const secret = 'foo';
      this.getSecret = () => {
        return secret;
      };
    }
  }).init(function () {
    this.a = 'a';
  }).create();

  expect(obj.getSecret()).toBe('foo');
  expect(obj.a).toBeTruthy();
});
