import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Dispositivo } from '../dispositivo/dispositivo';
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  private urlEndPoint: string = 'http://localhost:8080/api/dispositivos';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router) { }

  getDispositivos(): Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(this.urlEndPoint);
  }

  getDispositivo(id: any): Observable<Dispositivo>{
    return this.http.get<Dispositivo>(`${this.urlEndPoint}/${id}`)
    .pipe( catchError(e => {
      this.router.navigate(['/dispositivos']);
      Swal.fire('Error al Editar', e.error.mensaje, 'error')
      return throwError(e);
    }) )
  }

  create(dispositivo: Dispositivo) : Observable<Dispositivo> {
    return this.http.post<Dispositivo>(this.urlEndPoint, dispositivo, {headers: this.httpHeaders})
    .pipe( catchError (e => {      
      
      if(e.status == 400){
        return throwError(e);
      }

        Swal.fire('Error al Registrar el dispositivo', e.error.mensaje, 'error')
        return throwError(e);
    }))
  }

  update(dispositivo: Dispositivo): Observable<Dispositivo> {
    return this.http.put<Dispositivo>(`${this.urlEndPoint}/${dispositivo.id_dispositivo}`, dispositivo, {headers: this.httpHeaders})
    .pipe( catchError (e => {
      
      if(e.status == 400){
        return throwError(e);
      }

        Swal.fire('Error al Actualizar el dispositivo', e.error.mensaje, 'error')
        return throwError(e);
    }))
  }

  delete(id: number) : Observable<Dispositivo> {
    return this.http.delete<Dispositivo>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
    .pipe( catchError (e => {
        Swal.fire('Error al Eliminar el dispositivo', e.error.mensaje, 'error')
        return throwError(e);
    }))
  }

}
