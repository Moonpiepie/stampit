'use strict'

export interface Descriptor extends StandardDescriptor {
  init?: any
  props?: any
  deepProps?: any
  statics?: any
  deepStatics?: any
  conf?: any
  deepConf?: any
}

export interface StandardDescriptor {
  [index: string]: any

  methods?: any
  properties?: any // standard props
  initializers?: any // standard init
  composers?: any // standard init
  deepProperties?: any // standard deepProps
  propertyDescriptors?: any

  staticProperties?: any // statics
  staticDeepProperties?: any // deepStatics
  staticPropertyDescriptors?: any

  configuration?: any // conf
  deepConfiguration?: any // deepConf
}

// stampit
export interface Stampit extends StampitFn, Utilities {
  compose: StampitFn
}

// const stamp:Stamp = stampit()
export interface Stamp extends Utilities {
  (...rest: (Descriptor | Stamp | null)[]): Stamp

  [index: string]: any

  compose: Stampit
  create: StampitFn
}

// stampit function
export interface StampitFn {
  (...rest: (Stamp | Descriptor | null)[]): Stamp
}

// static methods
export interface Utilities {
  [index: string]: any

  init: UtilityFn
  props: UtilityFn
  deepProps: UtilityFn
  statics: UtilityFn
  deepStatics: UtilityFn
  conf: UtilityFn
  deepConf: UtilityFn

  methods: UtilityFn
  properties: UtilityFn
  initializers: UtilityFn[]
  composers: UtilityFn
  deepProperties: UtilityFn
  propertyDescriptors: UtilityFn
  staticProperties: UtilityFn
  staticDeepProperties: UtilityFn
  staticPropertyDescriptors: UtilityFn
  configuration: UtilityFn
  deepConfiguration: UtilityFn
}

export interface UtilityFn {
  (...rest: any[]): any

  [index: string]: any
}
