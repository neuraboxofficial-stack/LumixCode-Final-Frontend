import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// Import your Clerk Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Debug: Log the environment variable (remove in production)
console.log("Clerk Publishable Key loaded:", PUBLISHABLE_KEY ? `✓ Yes (${PUBLISHABLE_KEY.substring(0, 20)}...)` : "✗ No");
console.log("All env vars:", Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));

// Always wrap the app with ClerkProvider so SignedIn/SignedOut components work
// This ensures components like <SignedOut> and <SignedIn> can be used anywhere in the app
if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY.trim() === "") {
  console.error(
    "⚠️ Clerk authentication is not configured. " +
    "Add VITE_CLERK_PUBLISHABLE_KEY to your .env file in the client/ directory."
  );
  console.error("Environment variable check:", {
    hasKey: !!PUBLISHABLE_KEY,
    keyValue: PUBLISHABLE_KEY,
    allViteEnv: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
  });
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
