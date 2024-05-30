import { Paper } from '@mantine/core'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ApolloProvider, MantineProvider, withProviders } from './providers'

import { AuthCallbackPage } from '../pages/AuthCallback'
import { HomePage } from '../pages/Home'
import { MainLayout } from '@/shared/ui/layouts/MainLayout/index'

const App = () => {
  return (
    <Paper>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/auth/callback/:provider' element={<AuthCallbackPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Paper>
  )
}

export default withProviders(MantineProvider, ApolloProvider)(App)