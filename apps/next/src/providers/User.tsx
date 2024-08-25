'use client'
import { UserContext } from "@/entities/user/model/context";
import {
  useGetMeSuspenseQuery,
  User,
} from "@/shared/api";
import { PropsWithChildren, useEffect, useState } from "react";

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { data: getMeData } = useGetMeSuspenseQuery({ fetchPolicy: "no-cache" });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (getMeData && getMeData.getMe) {
      setUser(getMeData.getMe);
    }
  }, [getMeData]);

  return (
    <UserContext.Provider value={{ user, isAuth: !!user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
