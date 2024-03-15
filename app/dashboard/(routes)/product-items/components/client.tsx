"use client"

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import {  useRouter } from "next/navigation";
import { ProductItemColumn, columns } from "./columns";

interface ProductItemClientProps {
  data: ProductItemColumn[];
}

export const ProductItemClient: React.FC<ProductItemClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Product Items (${data.length})`}
          description="Manage product items for your store"
        />
        <Button onClick={() => router.push(`/dashboard/product-items/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" data={data} columns={columns} />
    </>
  );
};
