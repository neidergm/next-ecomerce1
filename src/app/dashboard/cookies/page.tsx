import { TabBar } from "@/components/TabBar";
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Cookies Page',
  description: 'Cookies Page',
};

export default async function CookiesPage() {

  const cookieStore = await cookies()
  const currentTab = cookieStore.get('cartCurrentTab')?.value ?? "2"

  return (
    <div>
      <h1>Cookies Page</h1>
      <br />
      <TabBar currentTab={Number(currentTab)} />
    </div>
  );
}