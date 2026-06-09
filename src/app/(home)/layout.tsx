import { cookies } from "next/headers";
import HomeHeader from "@/app/(home)/_modules/layout/HomeHeader";
import HomeFooter from "@/app/(home)/_modules/layout/HomeFooter";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const darkMode = (await cookies()).get("theme")?.value === "dark";

  return (
    <>
      <HomeHeader darkMode={darkMode} />
      <main>{children}</main>
      <HomeFooter />
    </>
  );
}
