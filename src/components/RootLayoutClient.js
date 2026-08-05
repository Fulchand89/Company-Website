/**
 * RootLayoutClient — Server Component shell.
 *
 * Previously this was a Client Component that called usePathname() to decide
 * whether to show Navbar/Footer. That forced the entire Navbar + Footer tree
 * into the client JS bundle even though Footer has zero interactivity.
 *
 * Now the layout shell itself is a Server Component. Two thin Client Component
 * wrappers (NavbarWrapper, FooterWrapper) each call usePathname() independently
 * and render their respective component only on non-admin routes. This keeps
 * the client bundle surface-area to the minimum required.
 */
import NavbarWrapper from "@/components/NavbarWrapper";
import FooterWrapper from "@/components/FooterWrapper";

export default function RootLayoutClient({ children }) {
  return (
    <>
      <NavbarWrapper />
      <main className="flex-1">{children}</main>
      <FooterWrapper />
    </>
  );
}
