import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mantine/core";

import classes from './index.module.css'
import { Header } from "../../Header";
import { Footer } from "../../Footer";

export const MainLayout = () => {
  return (
    <div className={classes.layout}>
      <Header />
      <main>
        <Container>
          <Suspense >
            <Outlet />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </div>
  )
}