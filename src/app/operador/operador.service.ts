import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Operador } from '../operador/operador';
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {

  private urlEndPoint: string = 'http://localhost:8080/api/operadores';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private router:Router) { }

  getOperadores(): Observable<Operador[]> {
    //return of(OPERADORES);
    return this.http.get<Operador[]>(this.urlEndPoint);
  }

  getOperador(id: any): Observable<Operador>{
    return this.http.get<Operador>(`${this.urlEndPoint}/${id}`)
    .pipe( catchError(e => {
      this.router.navigate(['/operadores']);
      // Swal.fire('Error al Editar', `El operador con el id: ${id} no existe en la base de datos`, 'error')
      Swal.fire('Error al Editar', e.error.mensaje, 'error')
      return throwError(e);
    }) )
  }

  create(operador: Operador) : Observable<Operador> {
    return this.http.post<Operador>(this.urlEndPoint, operador, {headers: this.httpHeaders})
    .pipe( catchError(e => {
      
      if(e.status == 400){
        return throwError(e);
      }

      Swal.fire('Error al Registrar el operador!', e.error.mensaje, 'error');
      return throwError(e);
    }))
  }

  update(operador: Operador): Observable<Operador> {
    return this.http.put<Operador>(`${this.urlEndPoint}/${operador.id_operador}`, operador, {headers: this.httpHeaders})
    .pipe( catchError(e => {

      if(e.status == 400){
        return throwError(e);
      }

      Swal.fire('Error al Editar el operador!', e.error.mensaje, 'error');
      return throwError(e);
    }))
  }

  delete(id: number) : Observable<Operador> {
    return this.http.delete<Operador>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
    .pipe( catchError(e => {
      Swal.fire('Error al Eliminar el operador!', e.error.mensaje, 'error');
      return throwError(e);
    }))
  }

}
