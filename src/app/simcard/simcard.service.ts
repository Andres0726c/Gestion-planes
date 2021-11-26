import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Simcard } from '../simcard/simcard';
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SimcardService {

  private urlEndPoint: string = 'http://localhost:8080/api/simcards';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router) { }

  getSimcards(): Observable<Simcard[]> {
    //return of(SIMCARDS);
    return this.http.get<Simcard[]>(this.urlEndPoint);
  }

  getSimcard(id: any): Observable<Simcard>{
    return this.http.get<Simcard>(`${this.urlEndPoint}/${id}`)
    .pipe( catchError(e => {
      this.router.navigate(['/simcards']);
      Swal.fire('Error al Editar', e.error.mensaje, 'error')
      return throwError(e);
    }) )
  }

  create(simcard: Simcard) : Observable<Simcard> {
    return this.http.post<Simcard>(this.urlEndPoint, simcard, {headers: this.httpHeaders})
    .pipe( catchError(e => {
      
      if(e.status == 400){
        return throwError(e);
      }

      Swal.fire('Error al Registrar la Simcard!', e.error.mensaje, 'error');
      return throwError(e);
    }))
  }

  update(simcard: Simcard): Observable<Simcard> {
    return this.http.put<Simcard>(`${this.urlEndPoint}/${simcard.id_simcard}`, simcard, {headers: this.httpHeaders})
    .pipe( catchError(e => {

      if(e.status == 400){
        return throwError(e);
      }

      Swal.fire('Error al Editar la Simcard!', e.error.mensaje, 'error');
      return throwError(e);
    }))
  }

  delete(id: number) : Observable<Simcard> {
    return this.http.delete<Simcard>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
    .pipe( catchError(e => {
      Swal.fire('Error al Eliminar la Simcard!', e.error.mensaje, 'error');
      return throwError(e);
    }))
  }

}
