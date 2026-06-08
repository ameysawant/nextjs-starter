import LibraryHeader from "@/app/(library)/_modules/layout/LibraryHeader";
import LibraryFooter from "@/app/(library)/_modules/layout/LibraryFooter";

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <LibraryHeader />
      <main>{children}</main>
      <LibraryFooter />
    </section>
  );
}
