import {fakeAsync, TestBed} from '@angular/core/testing';

import {PostService} from './post.service';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {defer} from "rxjs";
import {Post} from "../models/post";
import {HistoryItem} from "../models/history-item";

describe('PostService', () => {
  let postService: PostService;
  let httpClientSpy: { get: jest.Mock };
  httpClientSpy = {get: jest.fn()};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PostService,
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
    postService = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(postService).toBeTruthy();
  });

  /*it('should be return posts', fakeAsync(() => {

    const testHistoryItem: HistoryItem = {
      id: 1,
      previous: 0,
      current: 1,
      postList: [
        {
          userId: 1,
          id: 1,
          title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
          userId: 1,
          id: 2,
          title: "qui est esse",
          body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        }
      ]
    };

    httpClientSpy.get.mockResolvedValue(defer(() => Promise.resolve(testHistoryItem)));

    postService.getLatestHistoryItem().subscribe((historyItems) => {
      expect(historyItems).toEqual(testHistoryItem);
    });
  }));*/
});
