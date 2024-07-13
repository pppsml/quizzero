import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { useProviderCallbackLazyQuery } from '@/shared/api/schema.gen'
import { LoadingOverlay } from '@mantine/core'

export const AuthCallbackPage = () => {
  const [sendProviderCallback] = useProviderCallbackLazyQuery()
  const  { provider } = useParams()
  const [ searchParams ] = useSearchParams()
  const code = searchParams.get('code')

  const closeWindow = () => {
    window.close()
  }

  useEffect(() => {
    if (!code || !provider) {
      closeWindow()
      return
    }

    sendProviderCallback({
      variables: {
        provider,
        code,
      }
    }).then(({ data }) => {
    localStorage.setItem('user', JSON.stringify(data?.providerCallback))

    closeWindow()
    })
  }, [])


  return (
    <LoadingOverlay visible />
  )
}