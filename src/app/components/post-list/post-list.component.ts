import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import {HistoryItem} from "../../models/history-item";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postList: Post[] = [];
  historySubscription: Subscription = new Subscription();

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    // retrieve posts from the API
    this.postService.retrievePosts();

    // listen to the history changes and set postList
    this.historySubscription = this.postService.getLatestHistoryItem().subscribe((historyItem: HistoryItem) => {
      if (historyItem && historyItem.postList) {
        this.postList = historyItem.postList;
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
   * Swap items in the post list
   * @param historyItem
   */
  onCardOrderChange(historyItem: HistoryItem) {
    if (this.postList && this.postList.length > 0) {

      // create a deep copy of the post-list to avoid update the state by reference.
      const tempPostList = [...this.postList];
      [tempPostList[historyItem.previous], tempPostList[historyItem.current]] =
        [tempPostList[historyItem.current], tempPostList[historyItem.previous]]
      historyItem.postList = tempPostList;

      // publish latest state of the history to the _postHistorySubject
      this.postService.setLatestHistoryItem(historyItem)
    }
  }

}
