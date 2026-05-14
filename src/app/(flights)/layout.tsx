import FlightsHeader from "@/app/(flights)/_modules/layout/FlightsHeader";
import FlightsFooter from "@/app/(flights)/_modules/layout/FlightsFooter";

export default function FlightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <FlightsHeader />
      <main>{children}</main>
      <FlightsFooter />
    </section>
  );
}
