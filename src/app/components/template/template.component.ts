import { Component } from'@angular/core';
import { NgForm } from'@angular/forms';

@Component({
  selector:'app-template',
  templateUrl:'./template.component.html',
  styles: []
})
export class TemplateComponent {

  usuario: object = {
    nombre: null,
    apellido: null,
    email: null,
    pais: '',
    sexo: 'Mujer'
  };

  paises = [
    {
      codigo: 'ARG',
      pais: 'Argentina'
    },
    {
      codigo: 'CRI',
      pais: 'Costa Rica'
    },
    {
      codigo: 'USA',
      pais: 'EEUU'
    }
  ];
  constructor() {}

  guardar(forma: NgForm) {
    console.log(forma);
  }
}
