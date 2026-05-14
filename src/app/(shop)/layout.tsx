import ShopHeader from "@/app/(shop)/_modules/layout/ShopHeader";
import ShopFooter from "@/app/(shop)/_modules/layout/ShopFooter";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ShopHeader />
      <main>{children}</main>
      <ShopFooter />
    </section>
  );
}
