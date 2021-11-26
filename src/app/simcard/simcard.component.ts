import { Component, OnInit } from '@angular/core';
import { SimcardService } from './simcard.service';
import { Simcard } from './simcard';
import { OperadorService } from '../operador/operador.service';
import { Operador } from '../operador/operador';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DetalleService } from './detalle.service';

@Component({
  selector: 'app-simcard',
  templateUrl: './simcard.component.html',
  styleUrls: ['./simcard.component.css']
})
export class SimcardComponent implements OnInit {

  simcards: Simcard[] = [];
  simcard: Simcard = new Simcard();  
  operadores: Operador[] = [];
  errores: string[] = [];
  simcardSeleccionada!: Simcard;

  constructor(private simcardService: SimcardService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private operadorService: OperadorService,
              private detalleService: DetalleService) { }


  ngOnInit(): void {
    this.simcardService.getSimcards().subscribe(
      simcards => this.simcards = simcards
    );
    this.operadorService.getOperadores().subscribe(
      operadores => this.operadores = operadores
    );
    this.cargarSimcard();
  }

  cargarSimcard(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id) {
        this.simcardService.getSimcard(id).subscribe(
          simcard => this.simcard = simcard
        )
      }
    })
  }

  public create():void {
    this.simcardService.create(this.simcard).
    subscribe( simcard => {
        this.router.navigate(['/simcards'])
        Swal.fire('Nuevo Simcard', `Simcard número ${simcard.numero} creada con éxito`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        
      }
    );
  }

  // public update(): void {
  //   this.simcardService.update(this.simcard).
  //   subscribe( simcard => {
  //       this.router.navigate(['/simcards'])
  //       Swal.fire('Simcard Actualizada', `La Simcard número ${simcard.numero} ha sido actualizada con éxito`, 'success' )
  //     },
  //     err => {
  //       this.errores = err.error.errors as string[];
  //     }
  //   )
  // }


  delete(simcard: Simcard): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Está Seguro?',
      text: `Desea eliminar la Simcard ${simcard.numero} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.simcardService.delete(simcard.id_simcard).subscribe(
          response => {
            this.simcards = this.simcards.filter(oper => oper !== simcard)
            swalWithBootstrapButtons.fire(
              'Simcard Eliminiada!',
              `La Simcard ${simcard.numero} ha sido Eliminada`,
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
          `No se eliminará la simcard ${simcard.numero}` ,
          'error'
        )
      }
    })
  }

  abrirModal(simcard: Simcard) {
    this.simcardSeleccionada = simcard;
    this.detalleService.abrirModal();
  }

}
