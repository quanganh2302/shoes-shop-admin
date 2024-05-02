"use client";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { UserColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { ApiList } from "@/components/ui/api-list";

interface UserClientProps {
  data: UserColumn[];
}

export const UserClient: React.FC<UserClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between mx-4">
        <Heading title={`User`} description="Manage User information" />
        <Button onClick={() => router.push(`/dashboard/users/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable searchKey="email" columns={columns} data={data} />
      <Separator />
      <ApiList entityName="users" entityIdName="userEmail" />
    </>
  );
};
