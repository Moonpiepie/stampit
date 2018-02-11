'use strict';
import {
  COMPOSE,
  COMPOSERS,
  CONF,
  CONFIGURATION,
  DEEP_CONFIGURATION,
  DEEP_CONG,
  DEEP_PROPERTIES,
  DEEP_PROPS,
  DEEP_STATICS,
  INIT,
  INITIALIZERS,
  METHODS,
  PROPERTIES,
  PROPERTY_DESCRIPTORS,
  PROPS,
  STATIC_DEEP_PROPERTIES,
  STATIC_PROPERTIES,
  STATIC_PROPERTY_DESCRIPTORS,
  STATICS
} from "./const";
import merge from 'lodash/merge'
import extractUniqueFunctions from "./extractUniqueFunctions";
import assign from "lodash/assign";
import {concat} from "./utils";
import {Stamp, Stampit, Utilities} from "./interface";

let allUtilities: any = {};

function createUtilityFunction(propName: string, action: Function) {
  return function (this: (undefined | Stamp | Stampit)) {
    let tmp: any = {};
    tmp[propName] = action.apply(undefined, concat.apply([{}], arguments));
    return ((this && (this as Stamp)[COMPOSE]) || allUtilities[COMPOSE]).call(this, tmp);
  };
}

allUtilities[METHODS] = createUtilityFunction(METHODS, assign);

allUtilities[PROPERTIES] = allUtilities[PROPS] =
  createUtilityFunction(PROPERTIES, assign);

allUtilities[INITIALIZERS] = allUtilities[INIT] =
  createUtilityFunction(INITIALIZERS, extractUniqueFunctions);

allUtilities[COMPOSERS] = createUtilityFunction(COMPOSERS, extractUniqueFunctions);

allUtilities[DEEP_PROPERTIES] = allUtilities[DEEP_PROPS] =
  createUtilityFunction(DEEP_PROPERTIES, merge);

allUtilities[STATIC_PROPERTIES] = allUtilities[STATICS] =
  createUtilityFunction(STATIC_PROPERTIES, assign);

allUtilities[STATIC_DEEP_PROPERTIES] = allUtilities[DEEP_STATICS] =
  createUtilityFunction(STATIC_DEEP_PROPERTIES, merge);

allUtilities[CONFIGURATION] = allUtilities[CONF] =
  createUtilityFunction(CONFIGURATION, assign);

allUtilities[DEEP_CONFIGURATION] = allUtilities[DEEP_CONG] =
  createUtilityFunction(DEEP_CONFIGURATION, merge);

allUtilities[PROPERTY_DESCRIPTORS] = createUtilityFunction(PROPERTY_DESCRIPTORS, assign);

allUtilities[STATIC_PROPERTY_DESCRIPTORS] = createUtilityFunction(STATIC_PROPERTY_DESCRIPTORS, assign);

export default (allUtilities as Utilities)
