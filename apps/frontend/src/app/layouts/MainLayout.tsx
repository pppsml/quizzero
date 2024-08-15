import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AppShell, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

export function MainLayout() {
  const [opened, { toggle }] = useDisclosure(); 

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      footer={{ height: 45 }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Header onBurgerMenuClick={toggle} />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        h="calc(100% - var(--app-shell-header-height))"
        pb="calc(var(--mantine-spacing-md) + var(--app-shell-footer-height))"
      >
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>

      <AppShell.Main miw={300}>
        <Suspense>
          <Outlet />
        </Suspense>
      </AppShell.Main>

      <AppShell.Footer pos="relative" zIndex={101}>
        <Group h="100%" px="md">
          <Footer />
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
