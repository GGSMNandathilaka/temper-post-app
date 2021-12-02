import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  public readonly POST_LIMIT = 5;
  postList: Post[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      if (posts && posts.length > 0) {
        this.postList = posts;
      }
    })
  }

}
