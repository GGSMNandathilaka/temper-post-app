import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/post";
import {HistoryItem} from "../../models/history-item";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() postItem: Post = new Post();
  @Input() itemOrder = 0;
  @Input() postLimit = 0;
  @Output() cardOrderChangeEmitter: EventEmitter<HistoryItem> = new EventEmitter<HistoryItem>();

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * put post item to the immediate upper state
   */
  onItemUp() {
    const historyItem: HistoryItem = new HistoryItem();
    historyItem.id = this.postItem.id;
    historyItem.previous = this.itemOrder;
    historyItem.current = this.itemOrder - 1;
    historyItem.postList = [];
    this.cardOrderChangeEmitter.emit(historyItem);
  }

  /**
   * put post item to the immediate down state
   */
  onItemDown() {
    const historyItem: HistoryItem = new HistoryItem();
    historyItem.id = this.postItem.id;
    historyItem.previous = this.itemOrder;
    historyItem.current = this.itemOrder + 1;
    historyItem.postList = [];
    this.cardOrderChangeEmitter.emit(historyItem);
  }

}
