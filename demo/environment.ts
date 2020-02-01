import { disableDebugTools } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
//import {} from 
let _decorateModuleRef = function identity<T>(value: T): T { return value; };

console.log("IS_PRODUCTION ", process.env.NODE_ENV )
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
/*{
if(IS_PRODUCTION) {
    IP : SERVERIP
}else{
    IP :'http://121.157.55.240'        
}
*/
//if( process.env.SERVERIP) 
//    const IP = 'http://121.157.55.240'

export const environment = {
//        IP : 'http://218.147.65.173:3000'
      IP: window.location.origin + ':3000'
 //   IP :'http://121.157.55.240'

};
export const decorateModuleRef = _decorateModuleRef;
