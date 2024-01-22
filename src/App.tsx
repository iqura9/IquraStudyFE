import { queryClient } from "api/auth.api";

import { AuthProvider } from "./contexts";
import AppRoutes from "./routes";

import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
