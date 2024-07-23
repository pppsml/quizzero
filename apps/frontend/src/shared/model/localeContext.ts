import { Dispatch, SetStateAction, createContext, useContext } from "react";

type LocaleContext = {
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>
}

export const localeContext = createContext<LocaleContext>({
  locale: navigator.language,
  setLocale: () => {},
})

export const useLocaleContext = () => useContext(localeContext)