import {Post} from "./post";

export class HistoryItem {
  id: number
  previous: number;
  current: number;
  postList: Post[]

  constructor(id: number, previous: number, current: number, postList: Post[]) {
    this.id = id;
    this.previous = previous;
    this.current = current;
    this.postList = postList;
  }
}
