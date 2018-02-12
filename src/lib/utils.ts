'use strict';
import {COMPOSE} from './const';

export function isFunction(obj: Function) {
  return typeof obj === 'function';
}

export function isObject(obj: (Object | Function)) {
  return obj && typeof obj === 'object' || isFunction(obj);
}

/**
 * Returns true if argument is a stamp.
 * @param {*} obj Any object
 * @returns {Boolean} True is the obj is a stamp
 */
export function isStamp(obj: any) {
  return isFunction(obj) && isFunction(obj[COMPOSE]);
}

export const isArray = Array.isArray;

export const slice = Array.prototype.slice;
export const concat = Array.prototype.concat;
