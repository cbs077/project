import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

//import { AlertService, AuthenticationService } from '../_services/index';
//import { Observable } from 'rxjs/Observable';

import { MqttService }                   from './mqtt.service';
import { IMqttMessage }                   from './mqtt.model';

import { Text }                   from './chat.model';
import { IMqttServiceOptions }           from './mqtt.model';

@Component({
    template: `
<!--        <h1>{{mesage}}</h1>
        <h1>{{(myOtherMessage$ | async)?.payload.toString()}}</h1>
        
        <button class="btn btn-secondary" type="button" (click)="unsafePublish('my/topic', 'test')">Go!</button>
-->
        <h1>ChatTest</h1>
        <div class="container bootstrap snippet">

        <div class="row">
            <div class="col-md-4 bg-white" style="height: 40px;">
                <div class=" row border-bottom padding-sm" style="height: 40px;">
                    Member
                </div>
                
                <!-- =============================================================== -->
                <!-- member list -->
                <ul class="friend-list">
                    <li class="active bounceInDown">
                        <a class="clearfix">
                            <img src="https://bootdey.com/img/Content/user_1.jpg" alt="" class="img-circle">
                            <div class="friend-name">   
                                <strong>John Doe</strong>
                            </div>
                            <div class="last-message text-muted">Hello, Are you there?</div>
                            <small class="time text-muted">Just now</small>
                            <small class="chat-alert label label-danger">1</small>
                        </a>
                    </li>
                    <li>
                        <a class="clearfix">
                            <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" class="img-circle">
                            <div class="friend-name">   
                                <strong>Jane Doe</strong>
                            </div>
                            <div class="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                            <small class="time text-muted">5 mins ago</small>
                        <small class="chat-alert text-muted"><i class="fa fa-check"></i></small>
                        </a>
                    </li> 
                    <li>
                        <a class="clearfix">
                            <img src="https://bootdey.com/img/Content/user_3.jpg" alt="" class="img-circle">
                            <div class="friend-name">   
                                <strong>Kate</strong>
                            </div>
                            <div class="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                            <small class="time text-muted">Yesterday</small>
                            <small class="chat-alert text-muted"><i class="fa fa-reply"></i></small>
                        </a>
                    </li>  
                </ul>
            </div>
            
            <!--=========================================================-->
            <!-- selected chat -->
            <div class="col-md-8 bg-white" style="height: 405px; overflow:scroll; height:xyz;" #scrollMe [scrollTop]="scrollMe.scrollHeight">
                <div class="chat-message" >
                    <ul class="chat"  *ngFor="let text of texts" #chatext><!-- #chatext -->
                        <li class="left clearfix" >
                            <span class="chat-img pull-left">
                                <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar">
                            </span>
                            <div class="chat-body clearfix " [attr.data-before]="name">
                                <div class="header">
                                    <strong class="primary-font">John Doe</strong>
                                    <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 12 mins ago</small>
                                </div>
                                <p>
                                    {{text.text}}
                                </p>
                            </div>
                        </li>
                  <!--   <li class="right clearfix">
                            <span class="chat-img pull-right">
                                <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar">
                            </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">Sarah</strong>
                                    <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 13 mins ago</small>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. 
                                </p>
                            </div>
                        </li> -->                 
                    </ul>
                </div>
                <div class="chat-box bg-white">
                    <div class="input-group">
                        <input #textInput class="form-control border no-shadow no-rounded" placeholder="Type your message here">
                        <span class="input-group-btn">
                            <button class="btn btn-success no-rounded" type="button" (click)="unsafePublish('my/topic', textInput.value)">Send</button>
                        </span>
                    </div><!-- /input-group --> 
                </div>            
            </div>        
        </div>
    </div>
      `
    ,styleUrls: ['./chat.component.css']
  })
  export class ChatComponent {
    @ViewChild('chatext') chatext ; 
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    
    private subscription: Subscription;
    public message: string;
//    private chatext: ElementRef;
        
    public texts: Text[] = [
                              {
                                  user: '번호',
                                  text: 'author',  
                              } 
                          ];
    constructor(private _mqttService: MqttService,
                private elementRef:ElementRef,
                private renderer: Renderer2) {
      console.log("constructor");
      this.subscription = this._mqttService.observe('my/topic').subscribe((message: IMqttMessage) => {
        
        this.message = message.payload.toString();
        console.log("received:", this.message );  
        
        var newtext = 
                       {
                           user : "번호",
                           text : this.message ,  
                       } 
                   ;
        this.texts.push( newtext );
        this.scrollToBottom();
        console.log( "texts", this.texts ) ;
      });
    }
    
    public unsafePublish(topic: string, message: string): void {
      this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
      console.log("send", message);
 
    }
    
    public ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }

  }
