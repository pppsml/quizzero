import { useState } from "react";
import { ActionIcon, Flex, LoadingOverlay } from "@mantine/core";
import { AllowedProviders } from "@repo/types";

import { providers } from "../model";
import { useGetAuthUriLazyQuery } from "@/shared/api/schema.gen";
import { getCurrentBrowserName } from "@/shared/utils/getCurrentBrowserName";
import { BrowserNames } from "@/shared/utils/getCurrentBrowserName/model";
import { spawnWindowInScreenCenter } from "@/shared/utils/spawnWindowInScreenCenter";

export const LoginWithProviders = () => {
  const [getAuthUri] = useGetAuthUriLazyQuery();
  const [ isSigning, setSigning ] = useState(false)

  const onSignIn = async (provider: AllowedProviders) => {
    setSigning(true)
    const { data } = await getAuthUri({
      variables: {
        provider,
      },
    });

    if (!data) {
      setSigning(false)
      return
    }

    const currentBrowser = getCurrentBrowserName();
    let win: Window | null | undefined = null;
    if (currentBrowser === BrowserNames.SAFARI) {
      window.location.assign(data.getAuthUri);
    } else {
      win = spawnWindowInScreenCenter(
        data.getAuthUri,
        "Quizzero Sign In",
        window
      );
    }

    win?.focus()
    const interval = setInterval(() => {
      if (win?.closed) {
        setSigning(false)
        clearInterval(interval)
      }
    }, 1e3)
  };

  const providersButtons = providers.map((prov) => (
    <ActionIcon
      key={prov.name}
      onClick={() => onSignIn(prov.name)}
      title={`Login with ${prov.title}`}
      variant="default"
      size="xl"
    >
      {prov.icon}
    </ActionIcon>
  ));

  return (
    <Flex justify="center" align="center" gap="md" pos="relative">
      <LoadingOverlay visible={isSigning} />
        {providersButtons}
        {providersButtons}
        {providersButtons}
    </Flex>
  );
};
