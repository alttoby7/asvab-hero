import AppNav from "@/components/AppNav";

/**
 * The account area (settings / billing / history) runs inside the premium member
 * shell, the same AppNav as /app, with the marketing chrome
 * (Nav / UpgradeBanner / Footer) hidden on /account. Individual pages keep their
 * own auth redirects, so this layout stays a thin shell wrapper.
 */
export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNav />
      <main className="relative z-1 min-h-[calc(100vh-4rem)] pb-16 sm:pb-0">{children}</main>
    </>
  );
}
