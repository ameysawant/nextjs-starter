import AccountHeader from "@/app/(account)/_modules/layout/AccountHeader";
import AccountFooter from "@/app/(account)/_modules/layout/AccountFooter";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AccountHeader />
      <main>{children}</main>
      <AccountFooter />
    </>
  );
}
