import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  libros:Libro[] = [];
  libro = new Libro();

  constructor(private libroService:LibroService) { }

  ngOnInit(): void {
    this.libroService.getLibros().subscribe(data => {
      this.libros = data.map(doc =>{
        return{
          ...doc.payload.doc.data() as Libro,
          id:doc.payload.doc.id
        };
      })
    });
  }

  //metodo para insertar un libro desde el formulario
  insertarLibro(){
    this.libroService.createLibro(this.libro);
    this.libro = new Libro();
  }

  //metodo para que al seleccionar un libro en la tabla, se le asigne a la propiedad liro
  selectLibro(libro:Libro){
    this.libro = libro;
  }

  //metodo para actualizar un documento desde el formulario
  update(){
    this.libroService.updateLibro(this.libro);
    this.libro = new Libro();
  }

  //metodo para eliminar un documento desde el formulario
  delete(id:string){
    this.libroService.deleteLibro(id);
    this.libro = new Libro();
  }
}