import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/post";
import {HistoryItem} from "../../models/history-item";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() postItem: Post = new Post(0, 0, '', '');
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
    const historyItem: HistoryItem = new HistoryItem(this.postItem.id, this.itemOrder, this.itemOrder - 1, []);
    this.cardOrderChangeEmitter.emit(historyItem);
  }

  /**
   * put post item to the immediate down state
   */
  onItemDown() {
    const historyItem: HistoryItem = new HistoryItem(this.postItem.id, this.itemOrder, this.itemOrder + 1, []);
    this.cardOrderChangeEmitter.emit(historyItem);
  }

}
