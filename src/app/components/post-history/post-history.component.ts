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
    this.historySubscription.add(this.postService.getLatestHistoryItemList().subscribe((historyItemList: HistoryItem[]) => {
      if (historyItemList) {
        this.historyItems = historyItemList;
      }
    }));
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
    if (historyItem) {

      // revoke postList to previous history item's post list
      if (this.historyItems[index]) {

        this.historyItems.splice(0, index + 1);
        this.postService.setLatestHistoryItemList(this.historyItems);
      }
    }
  }

}
