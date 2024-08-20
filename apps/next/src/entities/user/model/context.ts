'use client'
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface UserContext {
  user: any;
  isAuth: boolean;
  setUser: Dispatch<SetStateAction<any>>; // fix to User type
}

export const UserContext = createContext<UserContext>({ 
  user: null,
  isAuth: false,
  setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);