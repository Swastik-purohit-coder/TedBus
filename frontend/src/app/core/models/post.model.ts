export interface CommunityUser {
  _id: string;
  name: string;
  email?: string;
  picture?: string;
}

export interface Post {
  _id: string;
  user?: CommunityUser;
  title: string;
  content: string;
  imageUrl?: string;
  likes: string[];
  commentsCount: number;
  reportsCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  engagementScore?: number;
}