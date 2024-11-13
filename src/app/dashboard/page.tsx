import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const session = await auth().then(data => {
    console.log(data)
    return data;
  });


  if (!session) {
    redirect('/api/auth/signin')
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


      <div>
        <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-600">Welcome back, {session?.user?.name}!</p>
        <div>
          <pre>
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>

      {/* <WidgetItem /> */}


    </div>
  );
}