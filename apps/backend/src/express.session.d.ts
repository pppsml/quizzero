import { User } from "@repo/database/dist"

declare module 'express-session' {
  interface SessionData {
    user?: Pick<User, 'id'>
  }
}

export {}