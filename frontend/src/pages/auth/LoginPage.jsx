import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import logoUrl from "@/assets/images/gabay-gamot-logo-sm.png";
import { auth, firebaseConfigStatus } from "@/config/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("pwd") || "");

    if (!firebaseConfigStatus.isConfigured || !auth) {
      console.error("[GabayGamot Auth] Firebase config missing", firebaseConfigStatus.missingKeys);
      setErrorMessage("Firebase config is missing. Check the browser console.");
      return;
    }

    setIsSubmitting(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const tokenResult = await credential.user.getIdTokenResult(true);
      const role = tokenResult.claims.role || "none";
      const isSuperAdmin = tokenResult.claims.superAdmin === true;

      console.log("[GabayGamot Auth] Login successful", {
        uid: credential.user.uid,
        email: credential.user.email,
        emailVerified: credential.user.emailVerified,
        role,
        superAdmin: isSuperAdmin,
      });

      setMessage(`Login successful. Role: ${role}`);

      // Redirect based on role
      setTimeout(() => {
        if (isSuperAdmin || role === "super_admin") {
          window.location.href = "/super-admin";
        } else {
          window.location.href = "/"; // Default redirect for other users (or update later)
        }
      }, 500);
    } catch (error) {
      console.error("[GabayGamot Auth] Login failed", {
        code: error.code,
        message: error.message,
      });
      setErrorMessage("Login failed. Check the browser console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-screen min-h-dvh overflow-x-hidden bg-zinc-50 px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] sm:px-6 sm:py-14 md:px-8 md:py-20 lg:py-28 xl:py-32 dark:bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 sm:max-w-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-5 pb-6 sm:p-7 sm:pb-6 md:p-8 md:pb-6">
          <div className="text-center">
            <a href="/" aria-label="go home" className="mx-auto block w-fit">
              <img src={logoUrl} alt="GabayGamot" className="h-12 w-12 max-w-full rounded-md object-contain" />
            </a>
            <h1 className="mb-1 mt-4 text-lg font-semibold sm:text-xl">Sign In to GabayGamot</h1>
            <p className="text-sm text-muted-foreground sm:text-base">Welcome back! Sign in to continue</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input type="email" required name="email" id="email" />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pwd" className="text-sm">
                  Password
                </Label>
                <Button asChild variant="link" size="sm">
                  <a href="/forgot-password" className="link intent-info variant-ghost text-sm">
                    Forgot your Password ?
                  </a>
                </Button>
              </div>
              <Input
                type="password"
                required
                name="pwd"
                id="pwd"
                className="input sz-md variant-mixed"
              />
            </div>

            {message && (
              <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                {message}
              </p>
            )}
            {errorMessage && (
              <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
                {errorMessage}
              </p>
            )}

            <Button className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </div>

          <div className="my-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
            <hr className="border-dashed" />
            <span className="text-muted-foreground whitespace-nowrap text-xs">Or continue With</span>
            <hr className="border-dashed" />
          </div>

          <div className="grid gap-3">
            <Button type="button" variant="outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
                <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
              </svg>
              <span>Sign in with Google</span>
            </Button>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <p className="text-accent-foreground flex flex-wrap items-center justify-center text-center text-sm">
            Don't have an admin account ?
            <Button asChild variant="link" className="px-2">
              <a href="/signup">Create account</a>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
