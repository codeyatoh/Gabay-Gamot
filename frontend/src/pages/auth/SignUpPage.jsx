import logoUrl from "@/assets/images/gabay-gamot-logo-sm.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpPage() {
  return (
    <section className="flex min-h-screen min-h-dvh overflow-x-hidden bg-zinc-50 px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] sm:px-6 sm:py-14 md:px-8 md:py-20 lg:py-24 xl:py-28 dark:bg-transparent">
      <form
        action=""
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 sm:max-w-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-5 pb-6 sm:p-7 sm:pb-6 md:p-8 md:pb-6">
          <div className="text-center">
            <a href="/" aria-label="go home" className="mx-auto block w-fit">
              <img src={logoUrl} alt="GabayGamot" className="h-12 w-12 max-w-full rounded-md object-contain" />
            </a>
            <h1 className="mb-1 mt-4 text-lg font-semibold sm:text-xl">Create a GabayGamot Admin Account</h1>
            <p className="text-sm text-muted-foreground sm:text-base">Create a verified admin account for barangay setup</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstname" className="block text-sm">
                  Firstname
                </Label>
                <Input type="text" required name="firstname" id="firstname" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname" className="block text-sm">
                  Lastname
                </Label>
                <Input type="text" required name="lastname" id="lastname" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input type="email" required name="email" id="email" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="barangay" className="block text-sm">
                  Barangay
                </Label>
                <Input type="text" required name="barangay" id="barangay" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="setupCode" className="block text-sm">
                  Setup Code
                </Label>
                <Input type="text" required name="setupCode" id="setupCode" />
              </div>
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

            <Button className="w-full">Create Account</Button>
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
              <span>Sign up with Google</span>
            </Button>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <p className="text-accent-foreground flex flex-wrap items-center justify-center text-center text-sm">
            Have an account ?
            <Button asChild variant="link" className="px-2">
              <a href="/login">Sign In</a>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
