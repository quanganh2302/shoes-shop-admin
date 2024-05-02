import { ProductClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { formatterPrice, createNumberFormatter } from "@/lib/utils";
import { ProductColumn } from "./components/columns";
const ProductPage = async () => {
  const products = await prismadb.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!products) {
    return null;
  }
  const formattedProduct: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    qty_in_stoke: item.qty_in_stoke
      ? createNumberFormatter(10).format(item.qty_in_stoke.toNumber())
      : null,
    price: formatterPrice.format(item.price.toNumber()),
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProduct} />
      </div>
    </div>
  );
};

export default ProductPage;
