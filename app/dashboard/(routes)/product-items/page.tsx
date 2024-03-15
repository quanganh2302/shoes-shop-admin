import { ProductItemClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { formatterPrice, createNumberFormatter } from "@/lib/utils";
import { ProductItemColumn } from "./components/columns";
const ProductItemsPage = async () => {
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
      name: item.name,
      qty_in_stoke: createNumberFormatter(10).format(
        item.qty_in_stoke.toNumber()
      ),
      price: formatterPrice.format(item.price.toNumber()),
      isFeatured: item.isFeatured,
      isArchived: item.isArchived,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductItemClient data={formattedProductItem} />
      </div>
    </div>
  );
};

export default ProductItemsPage;
