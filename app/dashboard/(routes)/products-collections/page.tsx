import prismadb from "@/lib/prismadb";
import { ProductCollectionClient } from "./components/client";
import { ProductCollectionColumn } from "./components/columns";
import { format } from "date-fns";
const ProductCollectionPage = async () => {
  const ProductCollections = await prismadb.productAndCollection.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!ProductCollections) {
    return null;
  }

  const formattedProductCollection: ProductCollectionColumn[] =
    ProductCollections.map((item) => ({
      id: item.id,
      productId: item.productId,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));
  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <ProductCollectionClient data={formattedProductCollection} />
      </div>
    </div>
  );
};

export default ProductCollectionPage;
