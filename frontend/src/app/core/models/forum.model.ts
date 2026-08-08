import { CommunityUser } from "./post.model";

export interface ForumTopic {
  _id: string;
  title: string;
  description?: string;
  category: "Routes" | "Destinations" | "Travel Advice";
  createdBy: CommunityUser;
  createdAt: string;
}

export interface ForumPost {
  _id: string;
  topic: string;
  user: CommunityUser;
  content: string;
  status: string;
  createdAt: string;
}