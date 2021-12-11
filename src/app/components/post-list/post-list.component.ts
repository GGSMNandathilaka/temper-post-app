import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {HistoryItem} from "../../models/history-item";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  historyItemList: HistoryItem[] = [];
  historySubscription = new Subscription();
  isDataLoaded = false;

  constructor(public postService: PostService) {
  }

  ngOnInit(): void {
    // retrieve posts from the API
    this.postService.retrievePosts();

    this.historySubscription.add(this.postService.getLatestHistoryItemList().subscribe((historyItems: HistoryItem[]) => {
        if (historyItems && historyItems.length > 0) {
          this.isDataLoaded = true;
          this.historyItemList = [];
          this.historyItemList = historyItems;
        }
      })
    )
  }

  ngOnDestroy() {
    if (this.historySubscription) {
      this.historySubscription.unsubscribe();
    }
  }

  /***
   * Swap items in the post list
   * @param historyItem
   * @param postList
   */
  onCardOrderChange(historyItem: any, postList: Post[]) {
    if (postList && postList.length > 0) {

      // create a deep copy of the post-list to avoid update the state by reference.
      const tempPostList = [...postList];
      [tempPostList[historyItem.previous], tempPostList[historyItem.current]] =
        [tempPostList[historyItem.current], tempPostList[historyItem.previous]]
      historyItem.postList = tempPostList;

      this.historyItemList.unshift(historyItem);

      // publish latest state of the history to the _postHistorySubject
      this.postService.setLatestHistoryItemList(this.historyItemList);
    }
  }

}
