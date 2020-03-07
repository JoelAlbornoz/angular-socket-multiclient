import { Component, ViewEncapsulation  } from '@angular/core';
import { WebSocketService } from './web-socket.service'
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  },
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent {
  handleKeyboardEvent(event: any) {
    this.checkKey(event)
  }



  nombre = ''
  title = 'angular-socket-multiclient';
  input = "";
  compItem = { p: false, img: false, div: false, a: false, h1: false };
  htmlToAdd = {p:'',div:'',img:'',h1:'',a:''};
  socket: any;
  comprando = true;

  imagenes_curso= ['agustin', 'nico', 'lucas', 'joaquin', 'lucio', 'simon', 'profe', 'joel', 'carlos', 'gustavo', 'ayelen', 'martin']
  imagenes_pebetines=['croko','niyux','kamina','fd','gaston','igna','joel','chino','gio']
  imagenes = ['male','female','vaca']
  constructor(socket: WebSocketService = new WebSocketService) {
    this.socket = socket;
  }

  cambImg(val) {
    this.socket.emit("changeImg", { id: this.socket.id, img: '../assets/img/'+ val })
    console.log(val)
  }
  mensaje() {
    this.socket.mensajear(this.input);
  }


  checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '13') {
      // up arrow
      console.log('mensajeando')
      this.socket.mensajear({ mensaje: this.input, nombre: this.nombre, id: this.socket.id });
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
  checkKeyName(e) {
    if (e.keyCode == '13') {
      this.socket.changeName(this.nombre)
      console.log(this.nombre)
    }
  }
  toggleComp(val) {
    
    for (let i in this.compItem) {
      this.compItem[i] = false
    }
    this.compItem[val] = !this.compItem[val];
  };
  send(arg, text){
    this.socket.append({id:this.socket.id,el:arg,html:text})
    this.htmlToAdd = {p:'',div:'',img:'',h1:'',a:''};
  }
}

