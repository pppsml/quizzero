import { useParams, useSearchParams } from 'react-router-dom'

import { useProviderCallbackQuery } from '@/shared/api/schema.gen'

export const AuthCallbackPage = () => {
  const  { provider } = useParams()
  const [ searchParams ] = useSearchParams()
  const code = searchParams.get('code')

  if (!code || !provider) {
    return (
      <>
        <p>no code or provider</p>
      </>
    )
  }

  const { data, loading, error } = useProviderCallbackQuery({
    variables: {
      code,
      provider,
    }
  })

  return (
    <>
      <p>code: {code}</p>
      <p>provider: {provider}</p>
      <p>data: {JSON.stringify(data) ||  'null'}</p>
      <p>error: {error?.message || 'null'}</p>
      <p>loading: {loading.toString()}</p>
    </>
  )
}