import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PostListComponent} from './post-list.component';
import {createSpyFromClass, Spy} from "jest-auto-spies";
import {PostService} from "../../services/post.service";
import {BehaviorSubject} from "rxjs";
import {HistoryItem} from "../../models/history-item";

describe('PostListComponent', () => {
  let component: PostListComponent;
  let postServiceSpy: Spy<PostService>;

  let historyItems: HistoryItem[] = [
    {
      id: 1,
      current: 1,
      previous: 0,
      postList: [
        {
          body: 'test',
          id: 2,
          title: 'test',
          userId: 1
        },
        {
          body: 'test',
          id: 1,
          title: 'test',
          userId: 1
        },
        {
          body: 'test',
          id: 3,
          title: 'test',
          userId: 1
        },
        {
          body: 'test',
          id: 4,
          title: 'test',
          userId: 1
        },
        {
          body: 'test',
          id: 5,
          title: 'test',
          userId: 1
        }
      ]
    },
    {
      id: -1,
      current: -1,
      previous: -1,
      postList: [
        {
          body: 'test',
          id: 1,
          title: 'test',
          userId: 1
        },
        {
          body: 'test',
          id: 2,
          title: 'test',
          userId: 1
        },
        {
          body: 'test',
          id: 3,
          title: 'test',
          userId: 1
        },
        {
          body: 'test',
          id: 4,
          title: 'test',
          userId: 1
        },
        {
          body: 'test',
          id: 5,
          title: 'test',
          userId: 1
        }
      ]
    }
  ];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        PostListComponent,
        {
          provide: PostService,
          useValue: createSpyFromClass(PostService)
        },
      ]
    });
  });

  beforeEach(() => {
    component = TestBed.inject<any>(PostListComponent);

    postServiceSpy = TestBed.inject<any>(PostService);

    // give mock implementation for the mandatory functions
    const subj = new BehaviorSubject<HistoryItem[]>(historyItems);
    postServiceSpy.getLatestHistoryItemList.mockImplementation(() => subj.asObservable());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('METHOD: onCardOrderChange', () => {

    beforeEach(() => {
      component.historyItemList = historyItems;
    });

    it('should revoke history', () => {

      let newHistoryItem = {
        id: 3,
        current: 1,
        previous: 2,
        postList: []
      };


      component.onCardOrderChange(newHistoryItem, [
        {
          body: 'test',
          id: 2,
          title: 'test',
          userId: 1
        },
        {
          body: 'test',
          id: 1,
          title: 'test',
          userId: 1
        },
        {
          body: 'test',
          id: 3,
          title: 'test',
          userId: 1
        },
        {
          body: 'test',
          id: 4,
          title: 'test',
          userId: 1
        },
        {
          body: 'test',
          id: 5,
          title: 'test',
          userId: 1
        }
      ]);

      let expectedLatestHistoryItem = {
        id: 3,
        current: 1,
        previous: 2,
        postList: [
          {
            body: 'test',
            id: 2,
            title: 'test',
            userId: 1
          },
          {
            body: 'test',
            id: 3,
            title: 'test',
            userId: 1
          },
          {
            body: 'test',
            id: 1,
            title: 'test',
            userId: 1
          },
          {
            body: 'test',
            id: 4,
            title: 'test',
            userId: 1
          },
          {
            body: 'test',
            id: 5,
            title: 'test',
            userId: 1
          }
        ]
      };

      postServiceSpy.getLatestHistoryItemList().subscribe(historyItems => {
        expect(historyItems[0].current).toEqual(expectedLatestHistoryItem.current);
        expect(historyItems[0].previous).toEqual(expectedLatestHistoryItem.previous);
      });
    });

  })
});
