'use strict';
import {COMPOSE, DEEP_PROPERTIES, INITIALIZERS, METHODS, PROPERTIES, PROPERTY_DESCRIPTORS} from "./const";
import {isFunction} from "./utils";
import merge from 'lodash/merge'
import assign from "lodash/assign";
import {Descriptor, Stamp} from "./interface";

export default function createFactory() {

  /**
   * The Stamp factory function
   * @typedef {Function} Stamp
   * @returns {*} Instantiated object
   * @property {Descriptor} compose - The Stamp descriptor and composition function
   */
  return function Stamp(options: Descriptor): {} {
    let i: any = (Stamp as Stamp)[COMPOSE] || {};
    // Next line was optimized for most JS VMs. Please, be careful here!
    let obj: {} = {__proto__: i[METHODS]};

    let inits: Function[] = i[INITIALIZERS];
    let args = Array.prototype.slice.apply(arguments);

    let tmp = i[DEEP_PROPERTIES];
    if (tmp) merge(obj, tmp);
    tmp = i[PROPERTIES];
    if (tmp) assign(obj, tmp);
    tmp = i[PROPERTY_DESCRIPTORS];
    if (tmp) Object.defineProperties(obj, tmp);

    if (!inits || !inits.length) return obj;

    if (options === undefined) options = {};
    for (i = 0; i < inits.length;) {
      let initializer = inits[i++];
      if (isFunction(initializer)) {
        let returnedValue = initializer.call(obj, options,
          {instance: obj, stamp: Stamp, args: args});
        obj = returnedValue === undefined ? obj : returnedValue;
      }
    }

    return obj;
  }
}
