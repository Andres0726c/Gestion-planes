import { Component, OnInit } from "@angular/core";
import { DispositivoService } from './dispositivo.service';
import { Dispositivo } from './dispositivo';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dispositivo',
    templateUrl: './dispositivo.component.html',
    styleUrls: ['./dispositivo.component.html']
})

export class DispositivoComponent implements OnInit {

    dispositivos: Dispositivo[] = [];
    dispositivo: Dispositivo = new Dispositivo();
    errores: string[] = [];
  
    constructor(private dispositivoService: DispositivoService,
                private router: Router,
                private activateRoute: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.dispositivoService.getDispositivos().subscribe(
        dispositivos => this.dispositivos = dispositivos
      );
      this.cargarDispositivo();
    }
  
    cargarDispositivo(): void {
      this.activateRoute.params.subscribe(params => {
        let id = params['id']
        if(id) {
          this.dispositivoService.getDispositivo(id).subscribe(
            dispositivo => this.dispositivo = dispositivo
          )
        }
      })
    }
  
    public create():void {
      this.dispositivoService.create(this.dispositivo).
      subscribe( dispositivo => {
          this.router.navigate(['/dispositivos'])
          Swal.fire('Nuevo Dispositivo', `Dispositivo ${dispositivo.tipo_dispositivo} creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          
        }
      );
    }
  
    public update(): void {
      this.dispositivoService.update(this.dispositivo).
      subscribe( dispositivo => {
          this.router.navigate(['/dispositivos'])
          Swal.fire('Dispositivo Actualizado', `El dispositivo ${dispositivo.tipo_dispositivo} ha sido actualizado con éxito`, 'success' )
        },
        err => {
          this.errores = err.error.errors as string[];
          
        }
      )
    }
  
    delete(dispositivo: Dispositivo): void {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Está Seguro?',
        text: `Desea eliminar el Dispositivo ${dispositivo.tipo_dispositivo} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.dispositivoService.delete(dispositivo.id_dispositivo).subscribe(
            response => {
              this.dispositivos = this.dispositivos.filter(disp => disp !== dispositivo)
              swalWithBootstrapButtons.fire(
                'Dispositivo Eliminiado!',
                `El dispositivo ${dispositivo.tipo_dispositivo} ha sido Eliminado`,
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
            `No se eliminará el dispositivo ${dispositivo.tipo_dispositivo}` ,
            'error'
          )
        }
      })
    }
  
  
  }  