export interface Post {
  id: number;
  appUserId: number;
  title: string;
  description: string;
  isCollected: boolean;
  created: Date;
  idNumber: string;
  isDeleted: boolean;
}
