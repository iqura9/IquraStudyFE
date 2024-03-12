import { createContext, useContext, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";

import messages_en from "./../translations/en.json";
import messages_uk from "./../translations/uk.json";

const LocaleContext = createContext<
  Partial<{
    handleLanguageChange: (locale: string) => void;
    locale: string;
  }>
>({});
const { Provider } = LocaleContext;

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useAuthState must be used in AuthProvider");

  return context;
};

interface Messages {
  [key: string]: { [key: string]: string };
}

const messages: Messages = {
  uk: messages_en,
  en: messages_uk,
};

export const LocaleProvider = (props: any) => {
  const [locale, setLocaleState] = useState<string>(() => {
    // Retrieve locale from local storage or use the browser's default language
    const storedLocale = localStorage.getItem("locale");
    return storedLocale || navigator.language;
  });

  // Function to handle language change
  const handleLanguageChange = (selectedLocale: string) => {
    setLocaleState(selectedLocale);
  };

  useEffect(() => {
    // Save the locale to local storage whenever it changes
    localStorage.setItem("locale", locale);
  }, [locale]);

  // If the user's preferred language is not available, fall back to the default language
  if (!messages[locale]) {
    setLocaleState("en"); // Fallback to English if desired locale is not available
  }

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Provider
        value={{
          handleLanguageChange,
          locale,
        }}
        {...props}
      />
    </IntlProvider>
  );
};
