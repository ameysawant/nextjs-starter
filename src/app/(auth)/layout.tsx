import AuthHeader from "@/app/(auth)/_modules/layout/AuthHeader";
import AuthFooter from "@/app/(auth)/_modules/layout/AuthFooter";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHeader />
      <main>{children}</main>
      <AuthFooter />
    </>
  );
}
