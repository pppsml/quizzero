import { Dispatch, SetStateAction, createContext, useContext } from "react";

import type { User } from "@/shared/api";

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

export const useUserContext = () => useContext(UserContext)