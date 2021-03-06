import { NgModule, ModuleWithProviders } from '@angular/core';

import { MqttService }                   from './mqtt.service';
import { IMqttServiceOptions }           from './mqtt.model';

export * from './mqtt.service';
export * from './mqtt.model';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  connectOnCreate: true,
  hostname: '121.157.55.240',
  port: 1884,
  path: ''
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}

@NgModule({})
export class MqttModule {
  static forRoot(providedService: any = {
    provide: MqttService,
    useFactory: mqttServiceFactory
  }): ModuleWithProviders {
    return {
      ngModule: MqttModule,
      providers: [providedService]
    };
  }
}