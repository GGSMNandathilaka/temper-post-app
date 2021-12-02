import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/post";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() postItem: Post = new Post(0, 0, '', '');

  constructor() {
  }

  ngOnInit(): void {
  }

}
