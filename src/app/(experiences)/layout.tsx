import ExperiencesHeader from "@/app/(experiences)/_modules/layout/ExperiencesHeader";
import ExperiencesFooter from "@/app/(experiences)/_modules/layout/ExperiencesFooter";

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ExperiencesHeader />
      <main>{children}</main>
      <ExperiencesFooter />
    </section>
  );
}
