export interface ISession {
  _id: string;
  sid: string;
  data: string;
  userId: string;
  expiresAt: Date | null;
}