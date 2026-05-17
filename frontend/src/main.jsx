import React from "react";
import ReactDOM from "react-dom/client";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignUpPage } from "@/pages/auth/SignUpPage";
import { LandingPage } from "@/pages/landing/LandingPage";
import { SuperAdminPortal } from "@/pages/super-admin/SuperAdminPortal";
import { ThemeProvider } from "@/hooks/useTheme.jsx";
import "./styles/globals.css";

const routes = {
  "/": LandingPage,
  "/login": LoginPage,
  "/signup": SignUpPage,
  "/forgot-password": ForgotPasswordPage,
};

function App() {
  const [location, setLocation] = React.useState(() => ({
    pathname: window.location.pathname,
    hash: window.location.hash,
  }));
  const isSuperAdminRoute = location.pathname === "/super-admin" || location.pathname.startsWith("/super-admin/");
  const Page = isSuperAdminRoute ? SuperAdminPortal : routes[location.pathname] ?? LandingPage;

  React.useEffect(() => {
    const navigate = (href) => {
      const url = new URL(href, window.location.origin);

      window.history.pushState({}, "", `${url.pathname}${url.hash}`);
      setLocation({ pathname: url.pathname, hash: url.hash });
    };

    const handleClick = (event) => {
      const link = event.target.closest("a");

      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      const url = new URL(link.href);
      const isInternalLink = url.origin === window.location.origin;

      if (!isInternalLink) {
        return;
      }

      event.preventDefault();
      navigate(link.href);
    };

    const handlePopState = () => {
      setLocation({ pathname: window.location.pathname, hash: window.location.hash });
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  React.useEffect(() => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView();
      return;
    }

    window.scrollTo({ top: 0 });
  }, [location]);

  return <Page pathname={location.pathname} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
