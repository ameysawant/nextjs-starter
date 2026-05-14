import HotelsHeader from "@/app/(hotels)/_modules/layout/HotelsHeader";
import HotelsFooter from "@/app/(hotels)/_modules/layout/HotelsFooter";

export default function HotelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <HotelsHeader />
      <main>{children}</main>
      <HotelsFooter />
    </section>
  );
}
