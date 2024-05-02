import prismadb from "@/lib/prismadb";
import RoleForm from "./components/role-form";
const RolePage = async ({ params }: { params: { roleId: string } }) => {
  const role = await prismadb.role.findUnique({
    where: {
      id: params.roleId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8">
        <RoleForm initialData={role} />
      </div>
    </div>
  );
};

export default RolePage;
