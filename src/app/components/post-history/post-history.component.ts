import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {HistoryItem} from "../../models/history-item";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-history',
  templateUrl: './post-history.component.html',
  styleUrls: ['./post-history.component.scss']
})
export class PostHistoryComponent implements OnInit, OnDestroy {

  historyItems: HistoryItem[] = [];
  historySubscription: Subscription = new Subscription();

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    // observe the history changes and push to a singleton history array which is resides in the post service.
    this.historySubscription = this.postService.getLatestHistoryItem().subscribe((historyItem: HistoryItem) => {
      if (historyItem) {
        if (this.postService.historyItems) {
          this.postService.historyItems.push(historyItem);
        } else {
          this.postService.historyItems = [];
        }
        this.historyItems = this.postService.historyItems;
      }
    });
  }

  ngOnDestroy() {
    if (this.historySubscription) {
      // unsubscribe to prevent memory leakages
      this.historySubscription.unsubscribe();
    }
  }

  /**
   * Restore to the state immediately before the historyItem which receives this method.
   * History Item array will restore to the particular time travel selection.
   * Set latest historyItem to the _postHistorySubject.
   * @param historyItem
   * @param index
   */
  onHistoryRevoke(historyItem: HistoryItem, index: number) {
    if (historyItem && !!index) {
      // revoke postList to previous history item's post list
      if (this.postService.historyItems[index - 1]) {

        const hItems = [...this.postService.historyItems];

        // remove history items which are latest items upto revoke point
        this.postService.historyItems.splice(index - 1);

        this.postService.setLatestHistoryItem(hItems[index - 1]);
      }
    }
  }

}
