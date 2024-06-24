import { queryClient } from "api/auth.api";
import { PwaProvider } from "contexts/PWAContext";

import { AuthProvider, LocaleProvider } from "./contexts";
import AppRoutes from "./routes";

import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PwaProvider>
        <LocaleProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </LocaleProvider>
      </PwaProvider>
    </QueryClientProvider>
  );
}

export default App;
