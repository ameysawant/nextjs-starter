import HomeHeader from "@/app/(home)/_modules/layout/HomeHeader";
import HomeFooter from "@/app/(home)/_modules/layout/HomeFooter";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeHeader />
      <main>{children}</main>
      <HomeFooter />
    </>
  );
}
