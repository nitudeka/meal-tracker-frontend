import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./router";

function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
