import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PostHistoryComponent} from './post-history.component';
import {PostService} from "../../services/post.service";
import {HttpClient} from "@angular/common/http";
import {HistoryItem} from "../../models/history-item";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {createSpyFromClass, provideAutoSpy, Spy} from "jest-auto-spies";

describe('PostHistoryComponent', () => {
  let component: PostHistoryComponent;
  let fixture: ComponentFixture<PostHistoryComponent>;
  let postServiceSpy: Spy<PostService>;
  let httpClientSpy: { get: jest.Mock };
  httpClientSpy = {get: jest.fn()};

  const testHistoryData: HistoryItem[] = [
    {
      id: 2,
      previous: 1,
      current: 0,
      postList: [
        {
          userId: 1,
          id: 2,
          title: "test2",
          body: "test2"
        },
        {
          userId: 1,
          id: 1,
          title: "test1",
          body: "test1"
        }
      ]
    },
    {
      id: 3,
      previous: 2,
      current: 1,
      postList: [
        {
          userId: 1,
          id: 3,
          title: "test3",
          body: "test3"
        },
        {
          userId: 1,
          id: 1,
          title: "test1",
          body: "test1"
        }
      ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostHistoryComponent],
      providers: [
        {provide: HttpClient, useValue: httpClientSpy},
        {
          provide: PostService,
          useValue: createSpyFromClass(PostService,
            {
              methodsToSpyOn: ["getLatestHistoryItem", "retrievePosts", "setLatestHistoryItem"]
            })
        },
      ]
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(PostHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    postServiceSpy = TestBed.inject<any>(PostService);
    ((<any>postServiceSpy)._postHistorySubject as BehaviorSubject<HistoryItem>) = new BehaviorSubject<HistoryItem>(new HistoryItem(-1, -1, -1, []));
    (<any>postServiceSpy).getLatestHistoryItem.mockReturnValue(of());

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('History Revoke', () => {

    beforeEach(() => {
      // set 2 post history items to historyItem list
      postServiceSpy.historyItems = testHistoryData;
    });

    it('should revoke history', () => {
      let historyItem: HistoryItem = {
        id: 3,
        previous: 2,
        current: 1,
        postList: [
          {
            userId: 1,
            id: 3,
            title: "test3",
            body: "test3"
          },
          {
            userId: 1,
            id: 1,
            title: "test1",
            body: "test1"
          }
        ]
      };

      component.onHistoryRevoke(historyItem, 0);
      expect(postServiceSpy.historyItems.length).toBe(1);
    });

  });

});
