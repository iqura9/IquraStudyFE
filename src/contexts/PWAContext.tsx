import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface PwaContextType {
  isInstalled: boolean;
  handleInstall: () => void;
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PwaContext = createContext<PwaContextType | undefined>(undefined);

interface PwaProviderProps {
  children: ReactNode;
}

export const PwaProvider: React.FC<PwaProviderProps> = ({ children }) => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check if the app is already installed
    const onAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    document.addEventListener("appinstalled", onAppInstalled);

    const handleBeforeInstallPrompt: EventListener = (e) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    document.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      document.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      document.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const handleInstall = useCallback(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
      });
    }
  }, [deferredPrompt]);

  return (
    <PwaContext.Provider value={{ isInstalled, handleInstall }}>
      {children}
    </PwaContext.Provider>
  );
};

export const usePwa = (): PwaContextType => {
  const context = useContext(PwaContext);
  if (!context) {
    throw new Error("usePwa must be used within a PwaProvider");
  }
  return context;
};
