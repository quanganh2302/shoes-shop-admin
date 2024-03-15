"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ConfigurationColumn, columns } from "./columns";

interface ConfigurationClientProps {
  data: ConfigurationColumn[];
}

export const ConfigurationClient: React.FC<ConfigurationClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Configurations (${data.length})`}
          description="Manage configurations for your store"
        />
        <Button onClick={() => router.push(`/dashboard/product-configurations/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="id" data={data} columns={columns} />
    </>
  );
};
