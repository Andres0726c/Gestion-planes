import { Component, NgZone, OnInit } from '@angular/core';
import { OperadorService } from './operador.service';
import { Operador } from './operador';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.css']
})
export class OperadorComponent implements OnInit {

  operadores: Operador[] = [];
  operador: Operador = new Operador();
  errores: string[] = [];

  constructor(private operadorService: OperadorService, 
              private router: Router,
              private activateRoute: ActivatedRoute,
              private zone: NgZone) { }


  ngOnInit(): void {
    this.operadorService.getOperadores().subscribe(
      operadores => this.operadores = operadores
    );
    this.cargarOperador();
  }

  cargarOperador(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id) {
        this.operadorService.getOperador(id).subscribe(
          operador => this.operador = operador
        )
      }
    })
  }

  public create():void {
    this.operadorService.create(this.operador).
    subscribe( operador => {
        this.router.navigate(['/operadores'])
        Swal.fire('Nuevo Operador', `Operador ${operador.operador} creado con éxito`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        
      }
    );
  }

  public update(): void {
    this.operadorService.update(this.operador).
    subscribe( operador => {
        this.router.navigate(['/operadores'])
        Swal.fire('Operador Actualizado', `El operador ${operador.operador} ha sido actualizado con éxito`, 'success' )
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    )
  }

  delete(operador: Operador): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Está Seguro?',
      text: `Desea eliminar el Operador ${operador.operador} ${operador.banda} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.operadorService.delete(operador.id_operador).subscribe(
          response => {
            this.operadores = this.operadores.filter(oper => oper !== operador)
            swalWithBootstrapButtons.fire(
              'Operador Eliminiado!',
              `El operador ${operador.operador} ha sido Eliminado`,
              'success'
            )
          }
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          `No se eliminará el operador ${operador.operador}` ,
          'error'
        )
      }
    })
  }


  
  reloadPage() { // click handler or similar
    this.zone.runOutsideAngular(() => {
        location.reload();
    });
}
}
