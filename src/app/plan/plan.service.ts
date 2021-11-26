import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Plan } from '../plan/plan';
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private urlEndPoint: string = 'http://localhost:8080/api/planes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router) { }

  getPlanes(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.urlEndPoint);
  }

  getPlan(id: any): Observable<Plan>{
    return this.http.get<Plan>(`${this.urlEndPoint}/${id}`)
    .pipe( catchError(e => {
      this.router.navigate(['/planes']);
      Swal.fire('Error al Editar', e.error.mensaje, 'error')
      return throwError(e);
    }) )
  }

  create(plan: Plan) : Observable<Plan> {
    return this.http.post<Plan>(this.urlEndPoint, plan, {headers: this.httpHeaders})
    .pipe( catchError( e => {

      if(e.status == 400){
        return throwError(e);
      }

      Swal.fire('Error al Registrar el Plan', e.error.mensaje, 'error')
      return throwError(e);
    }))
  }

  update(plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(`${this.urlEndPoint}/${plan.id_plan}`, plan, {headers: this.httpHeaders})
    .pipe( catchError( e => {

      if(e.status == 400){
        return throwError(e);
      }

      Swal.fire('Error al Actualizar el Plan', e.error.mensaje, 'error')
      return throwError(e);
    }))
  }

  delete(id: number) : Observable<Plan> {
    return this.http.delete<Plan>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
    .pipe( catchError( e => {
      Swal.fire('Error al Eliminar el Plan', e.error.mensaje, 'error')
      return throwError(e);
    }))
  }

}
