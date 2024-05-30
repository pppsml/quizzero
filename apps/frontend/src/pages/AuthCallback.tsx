import { useQuery, gql } from '@apollo/client'
import { useParams, useSearchParams } from 'react-router-dom'

export const AuthCallbackPage = () => {
  const  { provider } = useParams()
  const [ searchParams ] = useSearchParams()
  const code = searchParams.get('code')

  const { data, error, loading } = useQuery(gql`
    query providerCallback($provider: String!, $code: String!) {
      providerCallback(provider: $provider, code: $code) {
        _id
        email
      }
    }
  `, {
    variables: {
      code,
      provider,
    }
  })

  console.log('code', code)
  console.log('provider', provider)
  console.log('data', data)
  console.log('error', error?.message)
  console.log('loading', loading)
  return (
    <>
      AuthCallback
    </>
  )
}