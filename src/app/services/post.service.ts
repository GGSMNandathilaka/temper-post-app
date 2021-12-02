import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/post";
import {catchError, take} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // this should be keep as a configuration. Because back-end url can be change upn the environment.
  // Also we can define a proxy configuration for this.
  // Since this is a pilot project I've been keep endpoint url in the app environment file.
  endpointUrl = environment.endpointUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieve limited posts
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.endpointUrl)
      .pipe(
        catchError(this.handleError('getPosts', []))
      )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation
   * @param result
   * @private
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead send the error to remote logging infrastructure
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
