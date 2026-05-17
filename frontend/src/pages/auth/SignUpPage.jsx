import logoUrl from "@/assets/images/gabay-gamot-logo-sm.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const validProofs = [
  "Authorization letter for the Barangay Health Center",
  "City Health Office or Barangay Health Center endorsement",
  "Government, employee, or barangay health worker ID",
  "Appointment, designation, or employment certification connected to the health center",
];

export function SignUpPage() {
  return (
    <section className="flex min-h-screen min-h-dvh overflow-x-hidden bg-zinc-50 px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] sm:px-6 sm:py-14 md:px-8 md:py-20 lg:py-24 xl:py-28 dark:bg-transparent">
      <form
        action=""
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 sm:max-w-xl dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-5 pb-6 sm:p-7 sm:pb-6 md:p-8 md:pb-6">
          <div className="text-center">
            <a href="/" aria-label="go home" className="mx-auto block w-fit">
              <img
                src={logoUrl}
                alt="GabayGamot"
                className="h-12 w-12 max-w-full rounded-md object-contain"
              />
            </a>
            <h1 className="mb-1 mt-4 text-lg font-semibold sm:text-xl">
              Request Health Center Admin Access
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Submit your barangay health center details for Super Admin review
            </p>
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

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="block text-sm">
                  Email
                </Label>
                <Input type="email" required name="email" id="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="block text-sm">
                  Mobile Number
                </Label>
                <Input
                  type="tel"
                  required
                  name="mobileNumber"
                  id="mobileNumber"
                  placeholder="09XXXXXXXXX"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className="block text-sm">
                Position / Designation
              </Label>
              <Input
                type="text"
                required
                name="position"
                id="position"
                placeholder="e.g. Barangay Health Worker"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="region" className="block text-sm">
                  Region
                </Label>
                <Input
                  type="text"
                  required
                  name="region"
                  id="region"
                  placeholder="PSGC-backed selection later"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province" className="block text-sm">
                  Province
                </Label>
                <Input type="text" required name="province" id="province" />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cityMunicipality" className="block text-sm">
                  City / Municipality
                </Label>
                <Input type="text" required name="cityMunicipality" id="cityMunicipality" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="barangay" className="block text-sm">
                  Barangay
                </Label>
                <Input type="text" required name="barangay" id="barangay" />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="facilityName" className="block text-sm">
                  Barangay Health Center Name
                </Label>
                <Input type="text" required name="facilityName" id="facilityName" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facilityAddress" className="block text-sm">
                  Facility Address Line
                </Label>
                <Input
                  type="text"
                  required
                  name="facilityAddress"
                  id="facilityAddress"
                  placeholder="Street, sitio, or purok"
                />
              </div>
            </div>

            <div className="rounded-md border border-[#dbe9d5] bg-[#f8fbf5] p-4 text-left dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Valid proof documents
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Upload documents that prove you are authorized to request admin access for this
                barangay health center.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-xs leading-5 text-muted-foreground">
                {validProofs.map((proof) => (
                  <li key={proof}>{proof}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorizationDocument" className="block text-sm">
                Authorization Document
              </Label>
              <Input
                type="file"
                required
                name="authorizationDocument"
                id="authorizationDocument"
                accept=".pdf,.jpg,.jpeg,.png"
                className="cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-secondary-foreground"
              />
              <p className="text-xs leading-5 text-muted-foreground">
                Best option: signed letter for the Barangay Health Center from the Punong Barangay,
                City Health Office, or authorized health center officer.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idDocument" className="block text-sm">
                Government / Employee ID
              </Label>
              <Input
                type="file"
                required
                name="idDocument"
                id="idDocument"
                accept=".pdf,.jpg,.jpeg,.png"
                className="cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-secondary-foreground"
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-[#dbe9d5] bg-white p-3 text-left transition-all active:scale-[0.99] dark:border-white/10 dark:bg-white/5">
              <input
                type="checkbox"
                required
                name="authorizationAgreement"
                className="mt-1 h-4 w-4 shrink-0 rounded border-input accent-[#0b6b35]"
              />
              <span className="text-xs leading-5 text-muted-foreground">
                I confirm that I am authorized to request GabayGamot admin access for this Barangay
                Health Center and that the uploaded documents are valid for Super Admin review.
              </span>
            </label>

            <div className="rounded-md bg-amber-50 p-3 text-xs leading-5 text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
              No password is created yet. The Super Admin will review your request first, then issue
              a temporary password or setup link after approval.
            </div>

            <Button className="w-full">Submit for Review</Button>
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
