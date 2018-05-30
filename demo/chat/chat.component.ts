import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
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
                        <a href="#" class="clearfix">
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
                        <a href="#" class="clearfix">
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
                        <a href="#" class="clearfix">
                            <img src="https://bootdey.com/img/Content/user_3.jpg" alt="" class="img-circle">
                            <div class="friend-name">   
                                <strong>Kate</strong>
                            </div>
                            <div class="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                            <small class="time text-muted">Yesterday</small>
                            <small class="chat-alert text-muted"><i class="fa fa-reply"></i></small>
                        </a>
                    </li>  
                    <li>
                        <a href="#" class="clearfix">
                            <img src="https://bootdey.com/img/Content/user_1.jpg" alt="" class="img-circle">
                            <div class="friend-name">   
                                <strong>Kate</strong>
                            </div>
                            <div class="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                            <small class="time text-muted">Yesterday</small>
                            <small class="chat-alert text-muted"><i class="fa fa-reply"></i></small>
                        </a>
                    </li>     
                    <li>
                        <a href="#" class="clearfix">
                            <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" class="img-circle">
                            <div class="friend-name">   
                                <strong>Kate</strong>
                            </div>
                            <div class="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                            <small class="time text-muted">Yesterday</small>
                            <small class="chat-alert text-muted"><i class="fa fa-reply"></i></small>
                        </a>
                    </li>        
                    <li>
                        <a href="#" class="clearfix">
                            <img src="https://bootdey.com/img/Content/user_6.jpg" alt="" class="img-circle">
                            <div class="friend-name">   
                                <strong>Kate</strong>
                            </div>
                            <div class="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                            <small class="time text-muted">Yesterday</small>
                            <small class="chat-alert text-muted"><i class="fa fa-reply"></i></small>
                        </a>
                    </li>          
                    <li>
                        <a href="#" class="clearfix">
                            <img src="https://bootdey.com/img/Content/user_5.jpg" alt="" class="img-circle">
                            <div class="friend-name">   
                                <strong>Kate</strong>
                            </div>
                            <div class="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                            <small class="time text-muted">Yesterday</small>
                            <small class="chat-alert text-muted"><i class="fa fa-reply"></i></small>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="clearfix">
                            <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" class="img-circle">
                            <div class="friend-name">   
                                <strong>Jane Doe</strong>
                            </div>
                            <div class="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                            <small class="time text-muted">5 mins ago</small>
                        <small class="chat-alert text-muted"><i class="fa fa-check"></i></small>
                        </a>
                    </li>                 
                </ul>
            </div>
            
            <!--=========================================================-->
            <!-- selected chat -->
            <div class="col-md-8 bg-white" style="height: 605px; overflow:auto;">
                <div class="chat-message">
                    <ul class="chat" #chatext>
                        <li class="left clearfix">
                            <span class="chat-img pull-left">
                                <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar">
                            </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">John Doe</strong>
                                    <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 12 mins ago</small>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                            </div>
                        </li>
                        <li class="right clearfix">
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
                        </li>
                        <li class="left clearfix">
                            <span class="chat-img pull-left">
                                <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar">
                            </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">John Doe</strong>
                                    <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 12 mins ago</small>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                            </div>
                        </li>
                        <li class="right clearfix">
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
                        </li>                    
                        <li class="left clearfix">
                            <span class="chat-img pull-left">
                                <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar">
                            </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">John Doe</strong>
                                    <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 12 mins ago</small>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                            </div>
                        </li>
                        <li class="right clearfix">
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
                        </li>
                        <li class="right clearfix">
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
                        </li>                    
                    </ul>
                </div>
                <div class="chat-box bg-white">
                    <div class="input-group">
                        <input class="form-control border no-shadow no-rounded" placeholder="Type your message here">
                        <span class="input-group-btn">
                            <button class="btn btn-success no-rounded" type="button">Send</button>
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
    private subscription: Subscription;
    public message: string;
    private chatext: ElementRef;

    constructor(private _mqttService: MqttService,
                private elementRef:ElementRef,
                private renderer: Renderer2) {
      console.log("constructor");
      this.subscription = this._mqttService.observe('my/topic').subscribe((message: IMqttMessage) => {
        
        this.message = message.payload.toString();
        console.log("received:", this.message );  
        var Text =
            "<li class='left clearfix'><span class='chat-img pull-left'>"+
                "<img src='https://bootdey.com/img/Content/user_3.jpg' alt='User Avatar'>" +
            +"</span><div class='chat-body clearfix'>"
            +"<div class='header'>"
            +"<strong class='primary-font'>John Doe</strong>"
            +"<small class='pull-right text-muted'><i class='fa fa-clock-o'></i> 12 mins ago</small></div><p>"
            +"         Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            +"</p></div></li>";
//        var d1 = this.elementRef.nativeElement.querySelector('.chat');
//        d1.insertAdjacentHTML('beforeend', Text );
        
  //      const div = this.renderer.createElement('div');
  //      const text = this.renderer.createText('Hello world!');

 //       this.renderer.appendChild(div, text);
 //       this.renderer.appendChild(this.el.nativeElement, div);
        
        const li = this.renderer.createElement('li');
        
        const text = this.renderer.createText( Text );
        this.renderer.addClass(this.chatext.nativeElement, 'left');
        this.renderer.addClass(this.chatext.nativeElement, 'clearfix');

 //       this.renderer.appendChild(li, text);     
 //       this.renderer.appendChild(this.chatext.nativeElement, li);


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
