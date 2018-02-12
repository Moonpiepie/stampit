'use strict'
import { isArray, isObject, isStamp } from './lib/utils'
import assign from 'lodash/assign'
import standardiseDescriptor from './lib/standardiseDescriptor'
import compose from './lib/compose'
import allUtilities from './lib/allUtilities'
import { COMPOSE, COMPOSERS, CREATE, STATIC_PROPERTIES } from './lib/const'
import { Descriptor, Stamp } from './lib/interface'

let stampitWithUtils: any;

/**
 * Infected stamp. Used as a storage of the infection metadata
 * @type {Function}
 * @return {Stamp}
 */
let baseStampit: Stamp; // temporary reusing the variable

function stampit(this: undefined | Stamp, ...rest: (Descriptor | Stamp)[]): Stamp {
  let composables: (Descriptor | Stamp)[] = []
  let composerResult = this

  for (let i = 0; i < rest.length; i++) {
    let tmp: any = rest[i]
    if (isObject(tmp)) {
      composables.push(isStamp(tmp) ? tmp : standardiseDescriptor(tmp))
    }
  }

  if (!baseStampit) {
    let tmp: any = {}
    allUtilities[CREATE] = function(this: Stamp, ...rest: any[]) {
      return this.apply(undefined, rest)
    }
    tmp[STATIC_PROPERTIES] = allUtilities
    baseStampit = compose(tmp)
  }

  // Calling the standard pure compose function here.
  let composable: Stamp = compose.apply(composerResult || baseStampit, composables)
  if (composerResult) composables.unshift(composerResult)

  let composers = composable[COMPOSE][COMPOSERS]
  if (isArray(composers)) {
    for (let i = 0; i < composers.length; i++) {
      composerResult = composers[i]({ stamp: composable, composables: composables })
      composable = isStamp(composerResult) ? (composerResult as Stamp) : composable
    }
  }

  return composable
}

stampitWithUtils = allUtilities[COMPOSE] = assign(stampit, allUtilities) // Setting up the shortcut functions

stampitWithUtils[COMPOSE] = stampitWithUtils.bind(undefined) // bind to undefined

export default stampitWithUtils
