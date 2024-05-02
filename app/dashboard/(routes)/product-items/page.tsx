import prismadb from "@/lib/prismadb";
import { ProductItemClient } from "./components/client";
import { ProductItemColumn } from "./components/columns";
import { format } from "date-fns";
const ProductItemPage = async () => {
  const productItems = await prismadb.productItem.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!productItems) {
    return null;
  }


  const formattedProductItem: ProductItemColumn[] = productItems.map(
    (item) => ({
      id: item.id,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <ProductItemClient data={formattedProductItem} />
      </div>
    </div>
  );
};

export default ProductItemPage;
