import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/post";
import {catchError} from "rxjs/operators";
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

  private _historyItems: HistoryItem[] = [];
  private _postHistorySubject: BehaviorSubject<HistoryItem> = new BehaviorSubject(new HistoryItem(-1, -1, -1, []));

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieve limited posts from the API
   * Publish limited posts to a Replay Subject to maintain history
   */
  public retrievePosts() {
    this.http.get<Post[]>(this.endpointUrl)
      .subscribe(
        (data: Post[]) => {
          if (data && data.length > 0) {
            // initial data loading to history stack
            const historyItem: HistoryItem = new HistoryItem(-1, -1, -1, data.splice(0, this.POST_LIMIT));
            this._postHistorySubject.next(historyItem);
          } else {
            this._postHistorySubject.next(new HistoryItem(-1, -1, -1, []));
          }
        },
        catchError(this.handleError('retrievePosts', []))
      )
  }

  public getLatestHistoryItem(): Observable<HistoryItem> {
    return this._postHistorySubject.asObservable();
  }

  public setLatestHistoryItem(historyItem: HistoryItem) {
    this._postHistorySubject.next(historyItem);
  }


  get historyItems(): HistoryItem[] {
    return this._historyItems;
  }

  set historyItems(value: HistoryItem[]) {
    this._historyItems = value;
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
