import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {
  forma: FormGroup;

  usuario: object = {
    nombreCompleto: {
      nombre: 'Sarasa',
      apellido: 'sarsa2'
    },
    email: 'julianprino@gmail.com',
    pasatiempos: []
  };

  constructor() {
    this.forma = new FormGroup({
      nombreCompleto: new FormGroup({
        // 1er param valor defecto, 2do validaciones, 3ero validaciones async
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        apellido: new FormControl('', [Validators.required, this.noHerrera])
      }),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ]),
      pasatiempos: new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      // ExisteUsuario va a ser una validacion asyncronica estas siempre van como 3er parametro
      username: new FormControl('', Validators.required, [this.existeUsuario]),
      password1: new FormControl('', Validators.required),
      password2: new FormControl()
    });

    //Otra forma de agregar Validaciones
    this.forma.controls['password2'].setValidators([
      Validators.required,
      // bind le pasas por parametro a lo que hace
      // referencia this en la llamada a la funcion
      // probar como alternativa anonimizar noigual para que no pierda el scope
      this.noIgual.bind(this.forma)
    ]);

    //Detectar cambios en los formularios
    // this.forma.valueChanges.subscribe( data => {
    //   console.log(data);
    // });

    //Dtectar cambios en un campo especifico
    this.forma.controls['username'].valueChanges.subscribe( data => {
      console.log(data);
    });

    //Observar status change de un campo
    this.forma.controls['username'].statusChanges.subscribe( data => {
      console.log(data);
    });

    /**  De esta forma seteo valores por defecto,
     * siempre que el objeto responda a la misma estructura que el formulario
     */
    // this.forma.setValue(this.usuario);
  }

  ngOnInit() {}

  guardarCambios() {
    console.log(this.forma);
    /**
     * Como alternativa se puede armar el objeto a mano adentro del reset
     */
    // this.forma.reset(this.usuario);
  }

  agregarPasatiempo() {
    // Le digo a typescript que lo trate como un Formarray
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  // Funcion que se usa para una validacion personalizada del formulario (Obvio esto tiene que ir en un servicio o clase aparte para mas proligidad)
  // Se va a llamar aca       'apellido': new FormControl('', [Validators.required, this.noHerrera]),
  noHerrera(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'herrera') {
      return {
        noherrera: true
      };
    }

    return null;
  }

  noIgual(control: FormControl): { [s: string]: boolean } {
    let forma: any = this;
    if (control.value !== forma.controls['password1'].value) {
      return {
        noiguales: true
      };
    }

    return null;
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    //{ [s: string]: boolean }{

    const promesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, 3000);
    });

    return promesa;
  }
}
