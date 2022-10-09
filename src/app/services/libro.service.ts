import { Injectable } from '@angular/core';

import { Libro } from '../models/libro';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private firestore:AngularFirestore) { }

  //Metodo que permite obtener todos los documentos de la coleccion
  getLibros(){
    return this.firestore.collection('libros').snapshotChanges();
  }

  //metodo para insertar un documento en la coleccion
  createLibro(libro:Libro){
    return this.firestore.collection('libros').add(Object.assign({},libro));
  }

  //metodo para actualizar un documento existente en la coleccion
  updateLibro(libro:Libro){
    this.firestore.doc('libros/'+libro.id).update(libro);
  }

  //metodo para eliminar un documento de la coleccion
  deleteLibro(libroId:string){
    this.firestore.doc('libros/'+libroId).delete();
  }
}
