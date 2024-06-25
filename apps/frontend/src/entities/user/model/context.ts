import { Dispatch, SetStateAction, createContext } from "react";

import { User } from "@/shared/api/models.gen";

interface Context {
  user: User | null;
  isAuth: boolean;
  setUser: Dispatch<SetStateAction<User | null>>
}

export const UserContext = createContext<Context>({
  user: null,
  isAuth: false,
  setUser: () => {},
})