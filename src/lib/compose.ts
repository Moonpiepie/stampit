'use strict';
import createStamp from "./createStamp";
import {
  COMPOSE,
  COMPOSERS,
  CONFIGURATION,
  DEEP_CONFIGURATION,
  DEEP_PROPERTIES,
  INITIALIZERS,
  METHODS,
  PROPERTIES,
  PROPERTY_DESCRIPTORS,
  STATIC_DEEP_PROPERTIES,
  STATIC_PROPERTIES,
  STATIC_PROPERTY_DESCRIPTORS
} from "./const";
import {isObject} from "./utils";
import merge from 'lodash/merge'
import assign from "lodash/assign";
import extractUniqueFunctions from "./extractUniqueFunctions";
import {Descriptor, Stamp, Stampit} from "./interface";

/**
 * Mutates the dstDescriptor by merging the srcComposable data into it.
 * @param {Descriptor} dstDescriptor The descriptor object to merge into.
 * @param {Stamp | Descriptor} [srcComposable] The composable
 * (either descriptor or stamp) to merge data form.
 * @returns {Descriptor} Returns the dstDescriptor argument.
 */
function mergeComposable(dstDescriptor: Descriptor, srcComposable: Stamp | Descriptor): Descriptor {

  function mergeAssign(propName: string, deep = false): void {
    if (!isObject(srcComposable[propName])) {
      return;
    }
    if (!isObject(dstDescriptor[propName])) {
      dstDescriptor[propName] = {};
    }
    if (deep) {
      merge(dstDescriptor[propName], srcComposable[propName]);
    } else {
      assign(dstDescriptor[propName], srcComposable[propName]);
    }
  }

  function concatAssignFunctions(propName: string): void {
    let fns = extractUniqueFunctions(dstDescriptor[propName], srcComposable[propName]);
    if (fns) dstDescriptor[propName] = fns;
  }

  if (srcComposable && isObject(srcComposable = srcComposable[COMPOSE] || srcComposable)) {
    mergeAssign(METHODS);
    mergeAssign(PROPERTIES);
    mergeAssign(DEEP_PROPERTIES, true);
    mergeAssign(PROPERTY_DESCRIPTORS);
    mergeAssign(STATIC_PROPERTIES);
    mergeAssign(STATIC_DEEP_PROPERTIES, true);
    mergeAssign(STATIC_PROPERTY_DESCRIPTORS);
    mergeAssign(CONFIGURATION);
    mergeAssign(DEEP_CONFIGURATION, true);
    concatAssignFunctions(INITIALIZERS);
    concatAssignFunctions(COMPOSERS);
  }

  return dstDescriptor;
}

/**
 * Given the list of composables (stamp descriptors and stamps) returns
 * a new stamp (composable factory function).
 * @typedef {Function} Compose
 * Parameters:  {...(Stamp | Descriptor)} The list of composables.
 * @returns {Stamp} A new stamp (aka composable factory function)
 */
function compose(this: void | Stamp | Stampit, ...rest: (Stamp | Descriptor)[]): Stamp {
  let descriptor = Array.prototype.concat.apply([this], rest).reduce(mergeComposable, {});
  return createStamp(descriptor);
}

export default compose
