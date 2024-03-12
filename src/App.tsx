import { queryClient } from "api/auth.api";

import { AuthProvider, LocaleProvider } from "./contexts";
import AppRoutes from "./routes";

import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}

export default App;
