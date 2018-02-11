import _ from 'lodash';
import stampit from '../src/stampit';

// composers

test('stampit({ composers() })', () => {
  let executed = 0;
  let passedStamp;
  const stamp = stampit({
    composers(...args: any[]) {
      expect(args.length).toBe(1);
      expect(_.isPlainObject(args[0])).toBeTruthy();
      expect(_.isArray(args[0].composables)).toBeTruthy();
      expect(args[0].composables.length).toBe(1);
      expect(_.isPlainObject(args[0].composables[0])).toBeTruthy();
      expect(_.isArray(args[0].composables[0].composers)).toBeTruthy();
      executed += 1;
      passedStamp = args[0].stamp;
    }
  });

  expect(stamp.compose.composers).toBeTruthy();
  expect(stamp.compose.composers.length).toBe(1);
  expect(executed).toBe(1);
  expect(passedStamp).toBe(stamp);
});

test('stampit({ composers: function[] })', () => {
  let executed1 = 0;
  let executed2 = 0;
  let stamp1;
  let stamp2;
  const actualStamp = stampit({
    composers: [
      function composer1({stamp}: any) {
        stamp1 = stamp;
        executed1 += 1;
      },
      function composer2({stamp}: any) {
        stamp2 = stamp;
        executed2 += 1;
      }
    ]
  });

  expect(stamp1).toBe(actualStamp);
  expect(stamp2).toBe(actualStamp);
  expect(executed1).toBe(1);
  expect(executed2).toBe(1);
});

test('stampit({ composers() }).compose({ composers() })', () => {
  let executed1 = 0;
  let executed2 = 0;
  let stamp1;
  let stamp2;
  const actualStamp = stampit({
    composers({stamp}:any) {
      stamp1 = stamp;
      executed1 += 1;
    }
  })
    .compose({
      composers({stamp}:any) {
        stamp2 = stamp;
        executed2 += 1;
      }
    });

  expect(stamp1).toBe(actualStamp);
  expect(stamp2).toBe(actualStamp);
  expect(executed1).toBe(2);
  expect(executed2).toBe(1);
});

test('stampit({ composers() }) returned value replaces stamp', () => {
  const replacement = stampit();
  const stamp = stampit({
    composers() {
      return replacement;
    }
  });

  expect(stamp).toBe(replacement);
});

test('stampit({ composers() }) a non-stamp should be ignored', () => {
  const replacement = stampit();
  const stamp = stampit({
    composers() {
      return () => {// empty
      }; // non-stamp
    }
  });

  expect(stamp).not.toBe(replacement);
});

test('stampit({ composers() }) returned value passed to the second composer', () => {
  const replacement = stampit();
  let stamp2;
  stampit({
    composers() {
      return replacement;
    }
  }, {
    composers() {
      stamp2 = replacement;
    }
  });

  expect(stamp2).toBe(replacement);
});

test('composers should be deduped', () => {
  const stamp2 = stampit();
  const stamp = stampit({
    composers() {// empty
    }
  });

  const result = stamp.compose(stamp2).compose({}).compose(stamp);
  const composers = result.compose.composers;
  expect(composers.length).toBe(1);
});

test('stamp.compose({ composers() }) passes full composables array', () => {
  let run = 0;
  const stamp2 = stampit();
  const stamp = stampit({
    composers({composables}:any) {
      run += 1;
      if (run === 1) {
        expect(composables.length).toBe(1);
      }
      if (run === 2) {
        expect(composables.length).toBe(2);
        expect(composables[0]).toBe(stamp);
        expect(composables[1]).toBe(stamp2);
      }
    }
  });

  stamp.compose(stamp2);

  expect(run).toBe(2);
});
