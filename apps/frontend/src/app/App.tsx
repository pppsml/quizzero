import { Paper } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazily } from "react-lazily";

import { ApolloProvider, MantineProvider, AuthProvider, withProviders } from "./providers";

import { MainLayout } from "@/layouts/MainLayout/index";

const { AuthCallbackPage, HomePage } = lazily(() => import("@/pages"));

const App = () => {
  console.log(import.meta.env)

  return (
    <Paper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route
            path="/auth/callback/:provider"
            element={<AuthCallbackPage />}
          />
        </Routes>
      </BrowserRouter>
    </Paper>
  );
};

export default withProviders(MantineProvider, ApolloProvider, AuthProvider)(App);
