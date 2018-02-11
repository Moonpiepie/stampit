'use strict';
import {isObject} from "./utils";
import merge from 'lodash/merge'
import assign from "lodash/assign";
import extractUniqueFunctions from './extractUniqueFunctions';

import {
  COMPOSERS,
  CONFIGURATION,
  DEEP_CONFIGURATION,
  DEEP_CONG,
  DEEP_PROPERTIES,
  DEEP_PROPS,
  DEEP_STATICS,
  INITIALIZERS,
  METHODS,
  PROPERTIES,
  PROPERTY_DESCRIPTORS,
  STATIC_DEEP_PROPERTIES,
  STATIC_PROPERTIES,
  STATIC_PROPERTY_DESCRIPTORS,
} from './const'
import {Descriptor} from "./interface";

/**
 * Converts stampit extended descriptor to a standard one.
 * @param {Object|*} descr
 * methods -
 * properties -
 * props -
 * initializers -
 * init -
 * deepProperties -
 * deepProps -
 * propertyDescriptors -
 *
 * staticProperties -
 * staticDeepProperties -
 * statics -
 * deepStatics -
 *
 * staticPropertyDescriptors  -
 * configuration -
 * conf -
 * deepConfiguration -
 * deepConf -
 *
 * composers
 *
 * @returns {Descriptor} Standardised descriptor
 */
export default function standardiseDescriptor(descr: Descriptor) {
  const standard: any = {};
  let var1: any;
  let var2: any;
  let var3: any;

  standard[METHODS] = descr[METHODS] || undefined;

  var1 = descr[PROPERTIES];
  var2 = descr.props;
  standard[PROPERTIES] = isObject(var1 || var2) ? assign({}, var2, var1) : undefined;

  standard[INITIALIZERS] = extractUniqueFunctions(descr.init, descr[INITIALIZERS]);

  standard[COMPOSERS] = extractUniqueFunctions(descr[COMPOSERS]);

  var1 = descr[DEEP_PROPERTIES];
  var2 = descr[DEEP_PROPS];
  standard[DEEP_PROPERTIES] = isObject(var1 || var2) ? merge({}, var2, var1) : undefined;

  standard[PROPERTY_DESCRIPTORS] = descr[PROPERTY_DESCRIPTORS];

  var1 = descr[STATIC_PROPERTIES];
  var2 = descr.statics;
  standard[STATIC_PROPERTIES] = isObject(var1 || var2) ? assign({}, var2, var1) : undefined;

  var1 = descr[STATIC_DEEP_PROPERTIES];
  var2 = descr[DEEP_STATICS];
  standard[STATIC_DEEP_PROPERTIES] = isObject(var1 || var2) ? merge({}, var2, var1) : undefined;

  standard[STATIC_PROPERTY_DESCRIPTORS] = descr[STATIC_PROPERTY_DESCRIPTORS];

  var1 = descr[CONFIGURATION];
  var2 = descr.conf;
  standard[CONFIGURATION] = isObject(var1 || var2) ? assign({}, var2, var1) : undefined;

  var1 = descr[DEEP_CONFIGURATION];
  var2 = descr[DEEP_CONG];
  var3 = isObject(var1 || var2) ? merge({}, var2, var1) : undefined;

  standard[DEEP_CONFIGURATION] = var3;

  return standard;
}
