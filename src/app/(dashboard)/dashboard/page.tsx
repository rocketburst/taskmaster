import Something from "@/components/Something";
import { getCurrentUser } from "@/lib/session";

export default async function DashboardPage() {
  // const { data: session } = useSession();
  const user = await getCurrentUser();
  // console.log(user);

  return (
    <main>
      <Something />
      <p>{user && <span>{user.email}</span>}</p>
    </main>
  );
}
