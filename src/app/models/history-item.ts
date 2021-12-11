import {Post} from "./post";

export class HistoryItem {
  id: number
  previous: number;
  current: number;
  postList: Post[];
}
