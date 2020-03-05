import { Component } from '@angular/core';
import { WebSocketService } from './web-socket.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rojo= 'red'
  azul='blue'
  rosa='pink'
  title = 'angular-socket-multiclient';
  input="s";
  socket:any;
  constructor(socket:WebSocketService = new WebSocketService){
    this.socket = socket;
  }

    cambColor(val){
      this.socket.emit("changeColor", {id:this.socket.id, color: val})
      console.log(val)
    }
    mensaje(){
      this.socket.mensajear(this.input);
    }
  

   checkKey(e) {
    
      e = e || window.event;
  
      if (e.keyCode == '13') {
          // up arrow
          console.log('mensajeando')
          this.socket.mensajear(this.input);
      }
      else if (e.keyCode == '38') {
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

