import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { UserClient } from "./components/client";
import { UserColumn } from "./components/columns";
const UsersPage = async () => {
  const users = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!users) {
    return null;
  }

  const formattedUsers: UserColumn[] = users.map((item) => ({
    id: item.id,
    email: item.email,
    roleKey: item.roleKey,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8">
        <UserClient data={formattedUsers} />
      </div>
    </div>
  );
};

export default UsersPage;
