import { getServerSession } from "next-auth";
import Something from "@/components/Something";

export default async function Home() {
  // const { data: session } = useSession();
  const session = await getServerSession();
  console.log(session);

  return (
    <main>
      <Something />
      <p>{session && <span>{session.user.email}</span>}</p>
    </main>
  );
}
