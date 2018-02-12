'use strict';
import {COMPOSE, STATIC_DEEP_PROPERTIES, STATIC_PROPERTIES, STATIC_PROPERTY_DESCRIPTORS} from './const';
import createFactory from './createFactory';
import compose from './compose';
import {isFunction} from './utils';
import merge from 'lodash/merge';
import assign from 'lodash/assign';
import {Stamp, StandardDescriptor} from './interface';

/**
 * Returns a new stamp given a descriptor and a compose function implementation.
 * @param {Descriptor} [descriptor={}] The information about the object the stamp will be creating.
 * @returns {Stamp} The new stamp
 */
export default function createStamp(descriptor: StandardDescriptor): Stamp {
  let stamp: any = createFactory();

  let tmp: {} | undefined = descriptor[STATIC_DEEP_PROPERTIES];
  if (tmp) merge(stamp, tmp);

  tmp = descriptor[STATIC_PROPERTIES];
  if (tmp) assign(stamp, tmp);

  tmp = descriptor[STATIC_PROPERTY_DESCRIPTORS];
  if (tmp) Object.defineProperties(stamp, tmp);

  let _compose = isFunction(stamp[COMPOSE]) ? stamp[COMPOSE] : compose;
  assign(stamp[COMPOSE] = function () {
    return _compose.apply(this, arguments);
  }, descriptor);

  return stamp;
}
