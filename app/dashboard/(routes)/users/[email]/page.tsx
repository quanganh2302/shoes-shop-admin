import prismadb from "@/lib/prismadb";
import { UserForm } from "./components/user-form";

const UserPage = async ({ params }: { params: { email: string } }) => {
  const userEdit = await prismadb.user.findUnique({
    where: {
      id: params.email,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8">
        <UserForm initialData={userEdit} />
      </div>
    </div>
  );
};

export default UserPage;
