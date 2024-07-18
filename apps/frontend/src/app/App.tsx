import { Paper } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazily } from "react-lazily";

import { ApolloProvider, MantineProvider, AuthProvider, withProviders } from "./providers";

import { LayoutWithAppShell } from "./layouts/LayoutWithAppShell";

const { AuthCallbackPage, HomePage } = lazily(() => import("@/pages"));

const App = () => {
  return (
    <Paper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutWithAppShell />}>
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
