import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Operador } from '../operador/operador';
import { OperadorService } from '../operador/operador.service';
import { DetalleService } from './detalle.service';
import { Simcard } from './simcard';
import { SimcardComponent } from './simcard.component';
import { SimcardService } from './simcard.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

    @Input() simcardDetalle!: Simcard;
    simcard: Simcard = new Simcard();
    
    simcards: Simcard[] = [];
    operadores: Operador[] = [];
    errores: string[] = [];

  constructor(private simcardService: SimcardService,
              private operadorService: OperadorService,
              private router: Router,
              public detalleService: DetalleService,
              private activateRoute: ActivatedRoute) { }


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

      public update(): void {
        this.simcardService.update(this.simcard).
        subscribe( simcard => {
            this.router.navigate(['/simcards'])
            Swal.fire('Simcard Actualizada', `La Simcard número ${simcard.numero} ha sido actualizada con éxito`, 'success' )
          },
          err => {
            this.errores = err.error.errors as string[];
          }
        )
      }

      cerrarModal() {
        this.detalleService.cerrarModal();

      }

}
