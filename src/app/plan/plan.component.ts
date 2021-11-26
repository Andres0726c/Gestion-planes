import { Component, OnInit } from '@angular/core';
import { PlanService } from './plan.service';
import { Plan } from './plan';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  planes: Plan[] = [];
  plan: Plan = new Plan();
  errores: string[] = [];

  constructor(private planService: PlanService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.planService.getPlanes().subscribe(
      planes => this.planes = planes
    );
    this.cargarPlan();
  }

  cargarPlan(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id) {
        this.planService.getPlan(id).subscribe(
          plan => this.plan = plan
        )
      }
    })
  }

  public create():void {
    this.planService.create(this.plan).
    subscribe( plan => {
        this.router.navigate(['/planes'])
        Swal.fire('Nuevo Plan', `Plan ${plan.plan} creado con éxito`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        
      }
    );
  }

  public update(): void {
    this.planService.update(this.plan).
    subscribe( plan => {
        this.router.navigate(['/planes'])
        Swal.fire('Plan Actualizado', `El plan ${plan.plan} ha sido actualizado con éxito`, 'success' )
      },
      err => {
        this.errores = err.error.errors as string[];
        
      }
    )
  }

  delete(plan: Plan): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Está Seguro?',
      text: `Desea eliminar el Plan ${plan.plan} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.planService.delete(plan.id_plan).subscribe(
          response => {
            this.planes = this.planes.filter(pl => pl !== plan)
            swalWithBootstrapButtons.fire(
              'Plan Eliminiado!',
              `El plan ${plan.plan} ha sido Eliminado`,
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
          `No se eliminará el plan ${plan.plan}` ,
          'error'
        )
      }
    })
  }


}
