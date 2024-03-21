import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Creature} from './creature';
import {CREATURES} from './mock-creatures';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root',
})

export class CreatureService {
  private creatureUrl = 'http://localhost:4000/creatures';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** Log a CreatureService message with the console */
  private log(message: string) {
    this.messageService.add(`CreatureService: ${message}`);
  }

  getCreaturesURL(): Observable<any> {
    return this.http.get(this.creatureUrl);
  }


  /** GET creatures from the server */
  getCreatures(): Observable<Creature[]> {
    return this.http.get<Creature[]>(this.creatureUrl)
    .pipe(
      tap(_ => this.log('fetched creatures')),
      catchError(this.handleError<Creature[]>('getCreatures', []))
    );
  }

   /** GET creature by id. Return `undefined` when id not found */
   getCreatureNo404<Data>(id: number): Observable<Creature> {
    const url = `${this.creatureUrl}/?id=${id}`;
    return this.http.get<Creature[]>(url)
      .pipe(
        map(creatures => creatures[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} creature id=${id}`);
        }),
        catchError(this.handleError<Creature>(`getCreature id=${id}`))
      );
  }

  /** GET creature by id. Will 404 if id not found */
  getCreature(id: string): Observable<Creature> {
    const url = `${this.creatureUrl}/${id}`;
    return this.http.get<Creature>(url).pipe(
      tap(_ => this.log(`fetched creature id=${id}`)),
      catchError(this.handleError<Creature>(`getCreature id=${id}`))
    );
  }

  /* GET creatures whose name contains search term */
  searchCreatures(term: string): Observable<Creature[]> {
    if (!term.trim()) {
      // if not search term, return empty creature array.
      return of([]);
    }
    return this.http.get<Creature[]>(`${this.creatureUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found creatures matching "${term}"`) :
         this.log(`no creatures matching "${term}"`)),
      catchError(this.handleError<Creature[]>('searchCreatures', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Creature to the server */
 // Use `_id` field provided by MongoDB
addCreature(creature: Creature): Observable<Creature> {
  return this.http.post<Creature>(`${this.creatureUrl}/add`, creature, this.httpOptions).pipe(
    tap((newCreature: Creature) => this.log(`added creature w/ _id=${newCreature._id}`)),
    catchError(this.handleError<Creature>('addCreature'))
  );
}

deleteCreature(_id: string): Observable<any> {
  const url = `${this.creatureUrl}/${_id}`;
  return this.http.delete(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted creature _id=${_id}`)),
    catchError(this.handleError('deleteCreature'))
  );
}

  /** PUT: update the creature on the server */
  updateCreature(creature: Creature): Observable<any> {
    const url = `${this.creatureUrl}/${creature._id}`;
    return this.http.put(url, creature, this.httpOptions).pipe(
      tap(_ => this.log(`updated creature id=${creature._id}`)),
      catchError(this.handleError<any>('updateCreature'))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  } 
}





