import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Pessoa } from './Pessoa';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private urlApi = 'https://localhost:44370/api/v1/pessoas';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.urlApi)
    .pipe(
      tap(_ => this.log('Registros carregados')),
      catchError(this.handleError('getPessoas', []))
    );
  }

  getPessoa(id: number): Observable<Pessoa> {
    const url = `${this.urlApi}/${id}`;
    
    return this.http.get<Pessoa>(url).pipe(
      tap(_ => this.log(`Registro encontrado id = ${id}`)),
      catchError(this.handleError<Pessoa>(`getPessoa id=${id}`))
    );
  }

  updatePessoa (pessoa: Pessoa): Observable<any> {
    const url = `${this.urlApi}/${pessoa.id}`;

    return this.http.put(url, pessoa, httpOptions).pipe(
      tap(_ => this.log(`Registro Atualizado [id = ${pessoa.id}]`)),
      catchError(this.handleError<any>('updatePessoa'))
    );
  }

  addPessoa (pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.urlApi, pessoa, httpOptions).pipe(
      tap((newPessoa: Pessoa) => this.log(`Registro adicionado w/ [id=${newPessoa.id}]`)),
      catchError(this.handleError<Pessoa>('addPessoa'))
    );
  }

  deletePessoa (pessoa: Pessoa | number): Observable<Pessoa> {
    const id = typeof pessoa === 'number' ? pessoa : pessoa.id;
    const url = `${this.urlApi}/${id}`;

    return this.http.delete<Pessoa>(url, httpOptions).pipe(
      tap(_ => this.log(`Registro removido [id = ${id}]`)),
      catchError(this.handleError<Pessoa>('deletePessoa'))
    );
  }

  searchPessoa(term: string): Observable<Pessoa[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Pessoa[]>(`${this.urlApi}/?name=${term}`).pipe(
      tap(_ => this.log(`Nenhum registro encotrado com o termo "${term}"`)),
      catchError(this.handleError<Pessoa[]>('searchPessoas', []))
    );
  }

  private log(message: string) {
    this.messageService.add(message);
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      
      let messages = "";
      try{
        let virgula = "";
        error.error.errors.forEach(element => {
          messages += virgula + element.defaultMessage
          virgula = "; ";
        });
      }catch(ex){
        messages = error.message;
      }

      // TODO: better job of transforming error for user consumption
      this.log(messages);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
