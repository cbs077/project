import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

//import { AlertService, AuthenticationService } from '../_services/index';
//import { Observable } from 'rxjs/Observable';

import { MqttService }                   from './mqtt.service';
import { IMqttMessage }                   from './mqtt.model';

import { IMqttServiceOptions }           from './mqtt.model';


//import * from './mqtt.service';
//import * from './mqtt.model';
/*
@Component({
    moduleId: module.id,
    template: `
            <div class="col-md-6 col-md-offset-3 mx-auto">
                <h2>Login</h2>
            </div>
            `
})

export class ChatComponent implements OnInit {
  
}
*/
@Component({
    template: `
      <h1>{{mesage}}</h1>
      <h1>{{(myOtherMessage$ | async)?.payload.toString()}}</h1>
      <h1>ChatTest</h1>
      <button class="btn btn-secondary" type="button" (click)="unsafePublish('my/topic', 'test')">Go!</button>
`
  })
  export class ChatComponent {
    private subscription: Subscription;
    public message: string;
    
    constructor(private _mqttService: MqttService) {
      console.log("constructor");
      this.subscription = this._mqttService.observe('my/topic').subscribe((message: IMqttMessage) => {
        
        this.message = message.payload.toString();
        console.log("received", this.message );  
      });
    }
    
    public unsafePublish(topic: string, message: string): void {
      this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
      console.log("send");
    }
    
    public ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  }
