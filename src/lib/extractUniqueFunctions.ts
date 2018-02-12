'use strict';
import {isFunction} from './utils';

const concat = Array.prototype.concat;

function extractUniqueFunctions(...rest: (Function[] | undefined)[]): Function[] | undefined {
  const args = concat.apply([], rest);
  const tmp = args.filter((elem: Function, index: number, array: Function[]) => {
    return isFunction(elem) && array.indexOf(elem) === index;
  });
  return tmp.length ? tmp : undefined;
}

export default extractUniqueFunctions;
