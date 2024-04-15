import { ISession } from "@repo/types";

export interface CreateSession extends Omit<ISession, 'data' | '_id'> {
  data: Object;
}
