import stampit from '../src/stampit';

// Basics

test('.create()', () => {
  const stamp = stampit({
    methods: {
      foo() {
        return 'foo';
      }
    }
  });

  expect(stamp.create).toBeTruthy();
  expect(stamp.create().foo()).toBe('foo');
});

test('.create(options)', done => {
  const stamp = stampit.init((options) => {
    expect(options).toEqual({foo: 'bar'});
    done();
  });
  expect(stamp.create).toBeTruthy();
  stamp.create({foo: 'bar'});
});
