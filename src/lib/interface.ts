'use strict';

export interface Descriptor extends StandardDescriptor {
  init?: any;
  props?: any;
  deepProps?: any;
  statics?: any;
  deepStatics?: any;
  conf?: any;
  deepConf?: any;
}

export interface StandardDescriptor {
  [index: string]: any;

  methods?: any;
  properties?: any; // standard props
  initializers?: any; // standard init
  composers?: any; // standard init
  deepProperties?: any; // standard deepProps
  propertyDescriptors?: any;

  staticProperties?: any; // statics
  staticDeepProperties?: any; // deepStatics
  staticPropertyDescriptors?: any;

  configuration?: any; // conf
  deepConfiguration?: any; // deepConf
}

export interface ComposersFn {
  (): any
}

// stampit function
export interface StampitFn {
  (...rest: (Stamp | Descriptor)[]): Stamp;
}

// compose function
export interface ComposeFn extends StampitFn, Stamp {
  [index: string]: any;

  (...rest: any[]): Stamp;

  COMPOSERS: ComposersFn[];
}

export interface Stampit extends StampitFn, Utilities {
  compose: ComposeFn;
}

// stamp = stampit() 结果
export interface Stamp extends Utilities {
  (...rest: (Descriptor | Stamp)[]): Stamp;

  compose: ComposeFn;
  create: StampitFn;
}

export interface Utilities {
  [index: string]: any;

  init: Function;
  props: Function;
  deepProps: Function;
  statics: Function;
  deepStatics: Function;
  conf: Function;
  deepConf: Function;

  methods: Function;
  properties: Function;
  initializers: Function;
  composers: ComposersFn;
  deepProperties: Function;
  propertyDescriptors: Function;
  staticProperties: Function;
  staticDeepProperties: Function;
  staticPropertyDescriptors: Function;
  configuration: Function;
  deepConfiguration: Function;
}
