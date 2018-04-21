import { disableDebugTools } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

let _decorateModuleRef = function identity<T>(value: T): T { return value; };
/*
if(IS_PRODUCTION) {
  enableProdMode();
  _decorateModuleRef = (modRef: any) => {
    disableDebugTools();
    return modRef;
  };
}

if(IS_DEV) {
  
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
*/
export const environment = {
    IP :'http://121.157.55.240'
};
export const decorateModuleRef = _decorateModuleRef;
