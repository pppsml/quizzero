import { PropsWithChildren, useEffect, useState } from 'react'

import { UserContext } from '@/entities/user'
import { useGetMeQuery } from '@/shared/api/schema.gen'
import { User } from '@/shared/api/models.gen'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data } = useGetMeQuery()
  const [ user, setUser ] = useState<User | null>(null)

  useEffect(() => {
    if (data && data?.getMe) {
      setUser(data.getMe)
    }
  }, [data])

  return (
    <UserContext.Provider value={{ user, isAuth: !!user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}