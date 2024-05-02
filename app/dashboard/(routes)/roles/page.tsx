import prismadb from "@/lib/prismadb";
import { RoleClient } from "./components/client";
import { RoleColumn } from "./components/columns";
import { format } from "date-fns";
const RolePage = async () => {
  const roles = await prismadb.role.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!roles) {
    return null;
  }

  const formattedRole: RoleColumn[] = roles.map((item) => ({
    id: item.id,
    key: item.key,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <RoleClient data={formattedRole} />
      </div>
    </div>
  );
};

export default RolePage;
