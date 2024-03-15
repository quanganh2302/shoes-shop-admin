"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { VariationColumn, columns } from "./columns";

interface VariationClientProps {
  data: VariationColumn[];
}

export const VariationClient: React.FC<VariationClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Variations (${data.length})`}
          description="Manage variations for your store"
        />
        <Button onClick={() => router.push(`/dashboard/variations/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" data={data} columns={columns} />
    </>
  );
};
