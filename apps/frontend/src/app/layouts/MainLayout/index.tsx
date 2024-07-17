import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mantine/core";

import { Header } from "@/app/layouts/MainLayout/Header";
import { Footer } from "@/app/layouts/MainLayout/Footer";

import classes from './index.module.css'

export const MainLayout = () => {
  return (
    <div className={classes.layout}>
      <Header />
      <main className={classes.main__content}>
        <Container size='xl'>
          <Suspense >
            <Outlet />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </div>
  )
}