import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  //url='https://jade-holistic-cirrus.glitch.me/'; 
  url='https://socketer.glitch.me/';
   socket : any;
   elementsGroup:any = [];
   id : any;


  constructor() { 
    this.socket = io(this.url);
    

  
 //inicialización
    this.socket.on('connect', ()=>{
      console.log("conectado")
      this.socket.emit('create', {top:20, left:20, color:'red'})
      })
  //recibe la lista de elementos
      this.socket.on('lista',(lista) => {
        this.elementsGroup = lista;
      })
  //agrega a si mismo a la lista de elementos
      this.socket.on('creando', (elemento)=>{
        if (this.id !== elemento.id ){this.elementsGroup.push(elemento)}
        console.log(this.elementsGroup)
      })
  //recibe id 
      this.socket.on('id' ,(id)=>{
        this.id = id
        console.log("id:" + this.id)
      })
  //testea la conexion
    this.socket.on("test", (io) => {
      console.log("test")
    })
  //recibe actualizaciones
    this.socket.on('updatec', (lista)=>{
      this.elementsGroup = lista;
      console.log(this.elementsGroup);
    })

  }
  emit = (event, data) => {
    this.socket.emit(event, data);
  }
 //mueve el elemento
  public reset = () => {
    this.socket.emit("reset");

  }
  public mover = (dir) =>{
    this.emit('update', {dir: dir,id:this.id});
  }
}

