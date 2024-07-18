import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

export function LayoutWithAppShell() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      footer={{ height: 50 }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      {/* <AppShell.Header>
        <Header />
      </AppShell.Header> */}

      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Suspense>
          <Outlet />
        </Suspense>
      </AppShell.Main>

      <AppShell.Footer>
        <Group h='100%' px='md'>
          <Footer />
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}