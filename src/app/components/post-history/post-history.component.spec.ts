import {TestBed} from '@angular/core/testing';

import {PostHistoryComponent} from './post-history.component';
import {PostService} from "../../services/post.service";
import {HistoryItem} from "../../models/history-item";
import {BehaviorSubject} from "rxjs";
import {createSpyFromClass, Spy} from "jest-auto-spies";

describe('PostHistoryComponent', () => {
  let component: PostHistoryComponent;
  let postServiceSpy: Spy<PostService>;

  let historyItems: HistoryItem[] = [
    {
      id: 5,
      current: 3,
      previous: 4,
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
          id: 4,
          title: 'test',
          userId: 1
        },
        {
          body: 'test',
          id: 5,
          title: 'test',
          userId: 1
        },
        {
          body: 'test',
          id: 1,
          title: 'test',
          userId: 1
        }
      ]
    },
    {
      id: 4,
      current: 2,
      previous: 3,
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
          id: 4,
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
          id: 5,
          title: 'test',
          userId: 1
        }
      ]
    },
    {
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
    },
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
        PostHistoryComponent,
        {
          provide: PostService,
          useValue: createSpyFromClass(PostService)
        },
      ]
    });
  });

  beforeEach(() => {
    component = TestBed.inject<any>(PostHistoryComponent);

    postServiceSpy = TestBed.inject<any>(PostService);

    // give mock implementation for the mandatory functions
    const subj = new BehaviorSubject<HistoryItem[]>(historyItems);
    postServiceSpy.getLatestHistoryItemList.mockImplementation(() => subj.asObservable());
  });

  it('METHOD: Init', () => {
    expect(component).toBeTruthy();
  });

  describe('METHOD: onHistoryRevoke', () => {

    beforeEach(() => {
      component.historyItems = historyItems;
    });

    it('should revoke history', () => {

      let revokedHistoryItem = {
        id: 4,
        current: 2,
        previous: 3,
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
            id: 4,
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
            id: 5,
            title: 'test',
            userId: 1
          }
        ]
      }
      component.onHistoryRevoke(revokedHistoryItem, 1);

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
        expect(historyItems[0].id).toEqual(expectedLatestHistoryItem.id);
      });
    });

  });
});
