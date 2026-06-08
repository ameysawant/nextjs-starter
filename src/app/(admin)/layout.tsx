import AdminHeader from "@/app/(admin)/_modules/layout/AdminHeader";
import AdminFooter from "@/app/(admin)/_modules/layout/AdminFooter";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      <main>{children}</main>
      <AdminFooter />
    </>
  );
}
