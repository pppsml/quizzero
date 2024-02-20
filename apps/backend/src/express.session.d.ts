import { IUser } from "@repo/types"

declare module 'express-session' {
  interface SessionData {
    user?: Pick<IUser, '_id'>
  }
}

export {}