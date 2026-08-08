import { CommunityUser } from "./post.model";

export interface Comment {
  _id: string;
  post: string;
  user?: CommunityUser;
  text: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}