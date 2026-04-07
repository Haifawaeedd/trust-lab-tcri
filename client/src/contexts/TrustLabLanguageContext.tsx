/*
  TRUST-LAB Editorial Systems Lab reminder for this file:
  Language switching is a core product behavior, not a secondary option.
  The implementation should feel stable, minimal, and institutionally reliable.
  Does this choice reinforce or dilute our design philosophy?
*/

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type Language } from "@/content/trustlabContent";

type TrustLabLanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  isArabic: boolean;
};

const STORAGE_KEY = "trustlab-language";

const TrustLabLanguageContext = createContext<TrustLabLanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "ar" ? "ar" : "en";
}

export function TrustLabLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => getInitialLanguage());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: setLanguageState,
      isArabic: language === "ar",
    }),
    [language],
  );

  return (
    <TrustLabLanguageContext.Provider value={value}>
      {children}
    </TrustLabLanguageContext.Provider>
  );
}

export function useTrustLabLanguage() {
  const context = useContext(TrustLabLanguageContext);

  if (!context) {
    throw new Error("useTrustLabLanguage must be used within TrustLabLanguageProvider");
  }

  return context;
}
