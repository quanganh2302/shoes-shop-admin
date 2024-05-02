"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { GenderColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface GenderClientProps {
  data: GenderColumn[];
}

export const GenderClient: React.FC<GenderClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Genders (${data.length})`}
          description="Manage genders for your store"
        />
        <Button onClick={() => router.push(`/dashboard/genders/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" data={data} columns={columns} />

      <Separator />
      <ApiList entityName="genders" entityIdName="genderId" />
    </>
  );
};
