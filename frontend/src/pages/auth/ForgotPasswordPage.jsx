import logoUrl from "@/assets/images/gabay-gamot-logo-sm.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordPage() {
  return (
    <section className="flex min-h-screen min-h-dvh overflow-x-hidden bg-zinc-50 px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] sm:px-6 sm:py-14 md:px-8 md:py-20 lg:py-28 xl:py-32 dark:bg-transparent">
      <form
        action=""
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 sm:max-w-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-5 pb-6 sm:p-7 sm:pb-6 md:p-8 md:pb-6">
          <div className="text-center">
            <a href="/" aria-label="go home" className="mx-auto block w-fit">
              <img src={logoUrl} alt="GabayGamot" className="h-12 w-12 max-w-full rounded-md object-contain" />
            </a>
            <h1 className="mb-1 mt-4 text-lg font-semibold sm:text-xl">Recover Password</h1>
            <p className="text-sm text-muted-foreground sm:text-base">Enter your email to receive a reset link</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                type="email"
                required
                name="email"
                id="email"
                placeholder="name@example.com"
              />
            </div>

            <Button className="w-full">Send Reset Link</Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              We'll send you a link to reset your password.
            </p>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <p className="text-accent-foreground flex flex-wrap items-center justify-center text-center text-sm">
            Remembered your password?
            <Button asChild variant="link" className="px-2">
              <a href="/login">Log in</a>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
