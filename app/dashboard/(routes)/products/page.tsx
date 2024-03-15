import prismadb from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { format } from "date-fns";
const ProductsPage = async () => {
  const products = await prismadb.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!products) {
    return null;
  }

  const formattedProduct: ProductColumn[] = products.map((item) =>({
    id: item.id,
    name: item.name,  
    imageURL: item.imageURL,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  return (
    <div className="flex">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <ProductClient data={formattedProduct}/>
      </div>
    </div>
  );
};

export default ProductsPage;
