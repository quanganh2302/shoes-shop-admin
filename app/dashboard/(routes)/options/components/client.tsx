"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { OptionColumn, columns } from "./columns";

interface OptionClientProps {
  data: OptionColumn[];
}

export const OptionClient: React.FC<OptionClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Options (${data.length})`}
          description="Manage options for your store"
        />
        <Button onClick={() => router.push(`/dashboard/options/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="value" data={data} columns={columns} />
    </>
  );
};
