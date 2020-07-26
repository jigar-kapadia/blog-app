export interface IPost {
  pageSize: number;
  pageIndex: number;
  count: number;
  data: Datum[];
}

export interface Datum {
  account: Account;
  accountId: number;
  title: string;
  description: string;
  createdDate: string;
  isDeleted: boolean;
  comments: Comment[];
  likes: Like[];
  id: number;
}

export interface Account {
  userName: string;
  email: string;
  password: string;
  accountType: number;
  createdDateTime: string;
  lastLoginDateTime: string;
  isActive: boolean;
  posts: null[];
  comments: Comment[];
  likes: Like[];
 
}

export interface Like {
  postId: number;
  likedbyAccountId: number;
  createdDate: string;
  isLiked: boolean;
  id: number;
}

export interface Comment {
  postId: number;
  accountId: number;
  description: string;
  createdDate: string;
  isDeleted: boolean;
  id: number;
}
