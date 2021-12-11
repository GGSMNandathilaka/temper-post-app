import {TestBed} from '@angular/core/testing';

import {PostService} from './post.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BehaviorSubject, of} from "rxjs";
import {Post} from "../models/post";
import {HistoryItem} from "../models/history-item";
import {createSpyFromClass, Spy} from "jest-auto-spies";

describe('PostService', () => {
  let httpClientSpy: { get: jest.Mock };
  httpClientSpy = {get: jest.fn()};
  let postServiceSpy: Spy<PostService>;

  const dummyPosts: Post[] = [
    {
      userId: 1,
      id: 1,
      body: 'Http Client',
      title: 'Testing Angular Service'
    }, {
      userId: 2,
      id: 2,
      body: 'Hello World2',
      title: 'Testing Angular Services'
    }, {
      userId: 3,
      id: 3,
      body: 'Hello World3',
      title: 'Testing Angular Services'
    }, {
      userId: 4,
      id: 4,
      body: 'Hello World4',
      title: 'Testing Angular Services'
    }, {
      userId: 5,
      id: 5,
      body: 'Hello World5',
      title: 'Testing Angular Services'
    }, {
      userId: 6,
      id: 6,
      body: 'Hello World6',
      title: 'Testing Angular Services'
    }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {provide: HttpClient, useValue: httpClientSpy},
        {
          provide: PostService,
          useValue: createSpyFromClass(PostService)
        }
      ]
    });
    // postService = TestBed.inject(PostService);
    postServiceSpy = TestBed.inject<any>(PostService);

    const subj = of(dummyPosts);
    const historyItemSubj = new BehaviorSubject<HistoryItem[]>(new Array<HistoryItem>());
    postServiceSpy.retrievePosts.mockImplementation(() => subj);
    postServiceSpy.getLatestHistoryItemList.mockImplementation(() => historyItemSubj);
  });

  it('should be created a httpClient instance', () => {
    expect(httpClientSpy).toBeTruthy();
  });

  it('should be created a postService instance', () => {
    expect(postServiceSpy).toBeTruthy();
  });

  describe('METHOD: retrievePosts', () => {

    it('should be able to retrieve posts from the API via GET', () => {

      postServiceSpy.retrievePosts().subscribe(posts => {
        expect(posts.length).toEqual(5);
      });
    });

  });

  describe('METHOD: getLatestHistoryItemList', () => {

    it('should be able to retrieve history items', () => {

      postServiceSpy.getLatestHistoryItemList().subscribe(historyItems => {
        expect(historyItems.length).toEqual(1);
      });
    });

  });

});
