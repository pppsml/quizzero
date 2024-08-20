'use client'
import { UserContext } from "@/entities/user/model/context";
import { PropsWithChildren, useState } from "react";

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<any | null>(null); //fix to User type

  // useEffect(() => {
  //   const getUser = async () => {
  //     const user = await getMe();
  //     setUser(user);
  //   };
  //   getUser();
  // },

  return (
    <UserContext.Provider
      value={{ user, isAuth: !!user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
