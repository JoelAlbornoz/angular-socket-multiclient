import { Component } from '@angular/core';
import { WebSocketService } from './web-socket.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'angular-socket-multiclient';
  socket:any;
  constructor(socket:WebSocketService = new WebSocketService){
    this.socket = socket;
  }
  

   checkKey(e) {
     console.log("2")
      e = e || window.event;
  
      if (e.keyCode == '38') {
          // up arrow
          this.socket.mover('topma')
      }
      else if (e.keyCode == '40') {
          // down arrow
          this.socket.mover('topme')
      }
      else if (e.keyCode == '37') {
          // left arrow
          this.socket.mover('leftme')
      }
      else if (e.keyCode == '39') {
        this.socket.mover('leftma')
          
      }
  }

}

