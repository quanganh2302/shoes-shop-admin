"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductCollectionColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface ProductCollectionClientProps {
  data: ProductCollectionColumn[];
}

export const ProductCollectionClient: React.FC<ProductCollectionClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`ProductCollections (${data.length})`}
          description="Manage Product-Collections for your store"
        />
        <Button onClick={() => router.push(`/dashboard/products-collections/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="productId" data={data} columns={columns} />
      <Separator />
      <ApiList entityName="Product-Collections" entityIdName="productCollectionId" />
    </>
  );
};
