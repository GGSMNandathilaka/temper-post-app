import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/post";
import {map} from "rxjs/operators";
import {BehaviorSubject, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {HistoryItem} from "../models/history-item";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // this should be keep as a configuration. Because back-end url can be change upn the environment.
  // Also we can define a proxy configuration for this.
  // Since this is a pilot project I've been keep endpoint url in the app environment file.
  endpointUrl = environment.endpointUrl;

  public readonly POST_LIMIT = 5;

  private _postHistoryListSubject: BehaviorSubject<HistoryItem[]> = new BehaviorSubject(new Array<HistoryItem>());

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieve limited posts from the API
   * Publish limited posts to a Replay Subject to maintain history
   */
  public retrievePosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.endpointUrl).pipe(
      map(
        data => data.splice(0,this.POST_LIMIT),
        this.handleError('retrievePosts', [])
      )
    );
  }

  public getLatestHistoryItemList(): Observable<HistoryItem[]> {
    return this._postHistoryListSubject.asObservable();
  }

  public setLatestHistoryItemList(historyItemList: HistoryItem[]) {
    this._postHistoryListSubject.next(historyItemList);
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
