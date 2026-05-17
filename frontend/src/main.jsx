import React from "react";
import ReactDOM from "react-dom/client";
import { LandingPage } from "@/pages/landing/LandingPage";
import { ThemeProvider } from "@/hooks/useTheme.jsx";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  </React.StrictMode>
);
