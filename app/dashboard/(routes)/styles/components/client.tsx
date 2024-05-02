"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { StyleColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface StyleClientProps {
  data: StyleColumn[];
}

export const StyleClient: React.FC<StyleClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Styles (${data.length})`}
          description="Manage Styles for your store"
        />
        <Button onClick={() => router.push(`/dashboard/styles/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" data={data} columns={columns} />
      <Separator />
      <ApiList entityName="styles" entityIdName="styleId" />
    </>
  );
};
